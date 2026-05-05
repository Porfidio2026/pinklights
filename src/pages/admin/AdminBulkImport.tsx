import React, { useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { resizeImage } from '@/utils/imageResize';
import JSZip from 'jszip';
import {
  Upload,
  FileSpreadsheet,
  FolderArchive,
  Play,
  CheckCircle,
  XCircle,
  Loader2,
  MessageCircle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CsvRow {
  name: string;
  description: string;
  location: string;
  phone_number: string;
}

interface ImportResult {
  phone_number: string;
  name: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  error?: string;
  profileId?: string;
  pictureCount: number;
}

// WhatsApp message template — content to be filled in later
const WHATSAPP_MESSAGE = 'Hello! Your profile has been created on Pinklights. You can view and manage it by visiting our platform.';

// ---------------------------------------------------------------------------
// CSV parser
// ---------------------------------------------------------------------------

function splitCsvLine(line: string, sep: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && (current === '' || inQuotes)) {
      inQuotes = !inQuotes;
    } else if (ch === sep && !inQuotes) {
      fields.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim().replace(/^["']|["']$/g, ''));
  return fields;
}

function parseCsv(text: string): CsvRow[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headerLine = lines[0];
  const sep = headerLine.includes(';') ? ';' : ',';
  const headers = splitCsvLine(headerLine, sep).map((h) => h.toLowerCase());

  const nameIdx = headers.findIndex((h) => h === 'name' || h === 'full_name');
  const descIdx = headers.findIndex((h) => h === 'description' || h === 'about_me' || h === 'bio');
  const locIdx = headers.findIndex((h) => h === 'location' || h === 'city' || h === 'address');
  const phoneIdx = headers.findIndex((h) => h.includes('phone') || h === 'tel' || h === 'whatsapp');

  if (nameIdx === -1 || phoneIdx === -1) {
    throw new Error('CSV must have at least "name" and "phone_number" columns');
  }

  const rows: CsvRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i], sep);
    const phone = cols[phoneIdx]?.trim();
    if (!phone) continue;

    rows.push({
      name: cols[nameIdx] || '',
      description: descIdx >= 0 ? cols[descIdx] || '' : '',
      location: locIdx >= 0 ? cols[locIdx] || '' : '',
      phone_number: phone,
    });
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Geocoding
// ---------------------------------------------------------------------------

async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey || !address.trim()) return null;

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&components=country:BE`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === 'OK' && data.results?.[0]) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
  } catch (e) {
    console.warn('Geocoding failed for:', address, e);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Normalise phone number for folder matching
// ---------------------------------------------------------------------------

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-().+]/g, '');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AdminBulkImport = () => {
  const { toast } = useToast();
  const csvInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  // -----------------------------------------------------------------------
  // CSV handling
  // -----------------------------------------------------------------------

  const handleCsvSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);

    try {
      const text = await file.text();
      const rows = parseCsv(text);
      setCsvRows(rows);
      setResults([]);
      toast({ title: `CSV loaded`, description: `${rows.length} profiles found` });
    } catch (err: any) {
      toast({ title: 'CSV Error', description: err.message, variant: 'destructive' });
      setCsvRows([]);
    }
  }, [toast]);

  const handleZipSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setZipFile(file);
    toast({ title: 'ZIP loaded', description: file.name });
  }, [toast]);

  // -----------------------------------------------------------------------
  // Import execution
  // -----------------------------------------------------------------------

  const runImport = useCallback(async () => {
    if (csvRows.length === 0) {
      toast({ title: 'No data', description: 'Please load a CSV first', variant: 'destructive' });
      return;
    }

    setIsRunning(true);
    setProgress({ done: 0, total: csvRows.length });

    // Initialise results
    const initial: ImportResult[] = csvRows.map((row) => ({
      phone_number: row.phone_number,
      name: row.name,
      status: 'pending',
      pictureCount: 0,
    }));
    setResults([...initial]);

    // Load ZIP if provided
    let zip: JSZip | null = null;
    if (zipFile) {
      try {
        const buf = await zipFile.arrayBuffer();
        zip = await JSZip.loadAsync(buf);
      } catch {
        toast({ title: 'ZIP Error', description: 'Failed to read ZIP file', variant: 'destructive' });
      }
    }

    // Build a map: normalised phone → list of file entries in the ZIP
    const phoneToFiles = new Map<string, JSZip.JSZipObject[]>();
    if (zip) {
      zip.forEach((relativePath, entry) => {
        if (entry.dir) return;
        // Skip macOS resource forks and hidden files
        if (relativePath.includes('__MACOSX') || relativePath.includes('/._')) return;
        const parts = relativePath.split('/').filter(Boolean);
        if (parts.length < 2) return;
        const folderName = parts[parts.length - 2];
        const normalized = normalizePhone(folderName);
        if (!phoneToFiles.has(normalized)) {
          phoneToFiles.set(normalized, []);
        }
        phoneToFiles.get(normalized)!.push(entry);
      });
    }

    // Get admin session for storage uploads
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: 'Auth error', description: 'Not authenticated', variant: 'destructive' });
      setIsRunning(false);
      return;
    }

    // Process each profile sequentially to avoid overwhelming the API
    for (let i = 0; i < csvRows.length; i++) {
      const row = csvRows[i];

      // Mark as processing
      setResults((prev) => {
        const next = [...prev];
        next[i] = { ...next[i], status: 'processing' };
        return next;
      });

      try {
        // 1. Insert profile (no user_id — admin-created, no auth account)
        const { data: profile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            full_name: row.name,
            about_me: row.description || null,
            location: row.location || null,
            phone_number: row.phone_number,
            gender: 'Female',
            service_type: 'private',
            is_available: true,
            availability_status: 'available',
            payment_exempt: true, // admin-created profiles start exempt
          })
          .select('id')
          .single();

        if (insertError || !profile) {
          throw new Error(insertError?.message || 'Failed to insert profile');
        }

        // 1b. Geocode location → update lat/lng
        if (row.location) {
          const coords = await geocodeAddress(row.location);
          if (coords) {
            await supabase
              .from('profiles')
              .update({ latitude: coords.lat, longitude: coords.lng })
              .eq('id', profile.id);
          }
        }

        // 2. Upload pictures from ZIP (if available)
        const normalizedPhone = normalizePhone(row.phone_number);
        const imageFiles = phoneToFiles.get(normalizedPhone) || [];
        let uploadedCount = 0;
        let mainPictureUrl: string | null = null;

        for (let j = 0; j < imageFiles.length; j++) {
          const entry = imageFiles[j];
          const ext = entry.name.split('.').pop()?.toLowerCase() || 'jpg';
          if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) continue;

          try {
            const blob = await entry.async('blob');
            const file = new File([blob], entry.name, {
              type: ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg',
            });

            // Resize
            const resized = await resizeImage(file);

            // Upload to storage — use profile.id as folder (no user_id)
            const storagePath = `bulk/${profile.id}/${crypto.randomUUID()}.jpg`;
            const { error: uploadError } = await supabase.storage
              .from('profile_pictures')
              .upload(storagePath, resized, { contentType: 'image/jpeg' });

            if (uploadError) {
              console.error(`Upload failed for ${entry.name}:`, uploadError);
              continue;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
              .from('profile_pictures')
              .getPublicUrl(storagePath);

            const publicUrl = urlData.publicUrl;

            // Insert picture record
            await supabase.from('profile_pictures').insert({
              profile_id: profile.id,
              picture_url: publicUrl,
              is_main_picture: j === 0,
              display_order: j,
            });

            if (j === 0) mainPictureUrl = publicUrl;
            uploadedCount++;
          } catch (picErr) {
            console.error(`Picture processing failed for ${entry.name}:`, picErr);
          }
        }

        // 3. Set profile_picture_url to the first uploaded image
        if (mainPictureUrl) {
          await supabase
            .from('profiles')
            .update({ profile_picture_url: mainPictureUrl })
            .eq('id', profile.id);
        }

        // Mark success
        setResults((prev) => {
          const next = [...prev];
          next[i] = {
            ...next[i],
            status: 'success',
            profileId: profile.id,
            pictureCount: uploadedCount,
          };
          return next;
        });
      } catch (err: any) {
        setResults((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], status: 'failed', error: err.message };
          return next;
        });
      }

      setProgress({ done: i + 1, total: csvRows.length });
    }

    setIsRunning(false);
    toast({ title: 'Import complete', description: `Processed ${csvRows.length} profiles` });
  }, [csvRows, zipFile, toast]);

  // -----------------------------------------------------------------------
  // WhatsApp link
  // -----------------------------------------------------------------------

  const getWhatsAppUrl = (phone: string) => {
    const cleaned = phone.replace(/[^0-9+]/g, '');
    const number = cleaned.startsWith('+') ? cleaned.substring(1) : cleaned;
    return `https://wa.me/${number}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  };

  // -----------------------------------------------------------------------
  // Stats
  // -----------------------------------------------------------------------

  const successCount = results.filter((r) => r.status === 'success').length;
  const failCount = results.filter((r) => r.status === 'failed').length;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bulk Import</h1>
        <p className="text-muted-foreground mt-1">
          Upload a CSV and optional ZIP of photos to create profiles in bulk
        </p>
      </div>

      {/* Upload Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">CSV File</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Columns: <code>name</code>, <code>description</code>, <code>location</code>, <code>phone_number</code>
          </p>
          <Input
            ref={csvInputRef}
            type="file"
            accept=".csv,.tsv,.txt"
            onChange={handleCsvSelect}
            disabled={isRunning}
          />
          {csvFile && (
            <p className="text-sm text-muted-foreground mt-2">
              {csvFile.name} — {csvRows.length} profiles
            </p>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <FolderArchive className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Photos ZIP (optional)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            ZIP containing folders named by <code>phone_number</code>, each with profile photos
          </p>
          <Input
            ref={zipInputRef}
            type="file"
            accept=".zip"
            onChange={handleZipSelect}
            disabled={isRunning}
          />
          {zipFile && (
            <p className="text-sm text-muted-foreground mt-2">{zipFile.name}</p>
          )}
        </Card>
      </div>

      {/* Start Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={runImport}
          disabled={isRunning || csvRows.length === 0}
          size="lg"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing {progress.done}/{progress.total}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start Import ({csvRows.length} profiles)
            </>
          )}
        </Button>

        {results.length > 0 && !isRunning && (
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="h-4 w-4" /> {successCount} success
            </span>
            {failCount > 0 && (
              <span className="flex items-center gap-1 text-destructive">
                <XCircle className="h-4 w-4" /> {failCount} failed
              </span>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(progress.done / progress.total) * 100}%` }}
          />
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium w-8">#</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Phone</th>
                  <th className="text-left px-4 py-3 font-medium">Photos</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {results.map((result, idx) => (
                  <tr key={idx} className={result.status === 'failed' ? 'bg-destructive/10' : ''}>
                    <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{result.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{result.phone_number}</td>
                    <td className="px-4 py-3 text-muted-foreground">{result.pictureCount}</td>
                    <td className="px-4 py-3">
                      {result.status === 'pending' && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Pending</span>
                      )}
                      {result.status === 'processing' && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                          <Loader2 className="h-3 w-3 animate-spin" /> Processing
                        </span>
                      )}
                      {result.status === 'success' && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Success</span>
                      )}
                      {result.status === 'failed' && (
                        <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full" title={result.error}>
                          Failed{result.error ? `: ${result.error}` : ''}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {result.status === 'success' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            title="Send WhatsApp message"
                          >
                            <a
                              href={getWhatsAppUrl(result.phone_number)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="h-4 w-4 text-emerald-400" />
                            </a>
                          </Button>
                        )}
                        {result.status === 'failed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Retry (re-run import)"
                            disabled
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Instructions */}
      {results.length === 0 && csvRows.length === 0 && (
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>How it works:</strong></p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Prepare a CSV file with columns: <code>name</code>, <code>description</code>, <code>location</code>, <code>phone_number</code></li>
                <li>Prepare a ZIP file with folders named by phone number (e.g., <code>+32470123456/</code>), each containing profile photos</li>
                <li>Upload both files above and click "Start Import"</li>
                <li>Each profile will be created with its photos. Profiles are set as payment-exempt by default.</li>
                <li>After import, use the WhatsApp button to notify each profile owner.</li>
              </ol>
              <p className="mt-2">
                <strong>CSV example:</strong><br />
                <code>name,description,location,phone_number</code><br />
                <code>Sophie,Elegant and refined,Brussels,+32470123456</code>
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminBulkImport;
