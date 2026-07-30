/**
 * Generates a professional invoice PDF using pdf-lib (no DOM needed, works in Deno).
 * Stores the PDF in Supabase Storage and returns the public URL.
 */

import { PDFDocument, rgb, StandardFonts } from 'https://esm.sh/pdf-lib@1.17.1';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

interface InvoiceData {
  invoiceId: string;
  dteNumber: string;
  controlNumber: string;
  generationCode: string;
  selloRecibido?: string;
  date: string;
  customerName: string;
  customerEmail?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  ivaRate: number;
  ivaAmount: number;
  total: number;
  currency: string;
  companyName: string;
  companyRuc: string;
  companyNrc: string;
}

export async function generateInvoicePdf(
  supabase: SupabaseClient,
  data: InvoiceData,
): Promise<{ pdfUrl: string }> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const pink = rgb(0.85, 0.25, 0.55);
  const darkGray = rgb(0.2, 0.2, 0.2);
  const gray = rgb(0.5, 0.5, 0.5);
  const lightGray = rgb(0.92, 0.92, 0.92);
  const white = rgb(1, 1, 1);

  const pageWidth = 595;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  let y = 790;

  // ── Header ──
  page.drawRectangle({ x: 0, y: 780, width: pageWidth, height: 62, color: pink });

  page.drawText('PINKLIGHTS', {
    x: margin, y: 800, size: 22, font: helveticaBold, color: white,
  });
  page.drawText('.be', {
    x: margin + helveticaBold.widthOfTextAtSize('PINKLIGHTS', 22), y: 800,
    size: 18, font: helvetica, color: rgb(1, 1, 1, 0.8),
  });
  page.drawText('INVOICE', {
    x: pageWidth - margin - helveticaBold.widthOfTextAtSize('INVOICE', 20),
    y: 800, size: 20, font: helveticaBold, color: white,
  });

  y = 750;

  // ── Invoice info (left) + Company info (right) ──
  const drawLabel = (label: string, value: string, x: number, yPos: number) => {
    page.drawText(label, { x, y: yPos, size: 8, font: helveticaBold, color: gray });
    page.drawText(value, { x, y: yPos - 12, size: 10, font: helvetica, color: darkGray });
  };

  drawLabel('Invoice Number', data.dteNumber || data.invoiceId, margin, y);
  drawLabel('Date', data.date, margin, y - 30);
  drawLabel('Generation Code', data.generationCode.substring(0, 20) + '...', margin, y - 60);
  if (data.selloRecibido) {
    drawLabel('Receipt Stamp', data.selloRecibido.substring(0, 25) + '...', margin, y - 90);
  }

  const rightX = pageWidth - margin - 200;
  drawLabel('From', data.companyName, rightX, y);
  drawLabel('NIT', data.companyRuc, rightX, y - 30);
  drawLabel('NRC', data.companyNrc, rightX, y - 60);

  y -= 120;

  // ── Bill To ──
  page.drawRectangle({ x: margin, y: y - 5, width: contentWidth, height: 25, color: lightGray });
  page.drawText('BILL TO', { x: margin + 10, y: y, size: 9, font: helveticaBold, color: darkGray });
  y -= 25;
  page.drawText(data.customerName, { x: margin + 10, y: y, size: 10, font: helvetica, color: darkGray });
  if (data.customerEmail) {
    page.drawText(data.customerEmail, { x: margin + 10, y: y - 14, size: 9, font: helvetica, color: gray });
    y -= 14;
  }

  y -= 35;

  // ── Items table ──
  // Header row
  page.drawRectangle({ x: margin, y: y - 5, width: contentWidth, height: 22, color: pink });
  const colX = {
    desc: margin + 10,
    qty: margin + 300,
    price: margin + 370,
    total: margin + 440,
  };
  const headerY = y;
  page.drawText('Description', { x: colX.desc, y: headerY, size: 9, font: helveticaBold, color: white });
  page.drawText('Qty', { x: colX.qty, y: headerY, size: 9, font: helveticaBold, color: white });
  page.drawText('Price', { x: colX.price, y: headerY, size: 9, font: helveticaBold, color: white });
  page.drawText('Total', { x: colX.total, y: headerY, size: 9, font: helveticaBold, color: white });

  y -= 25;

  // Item rows
  for (const item of data.items) {
    page.drawText(item.description, { x: colX.desc, y, size: 9, font: helvetica, color: darkGray, maxWidth: 280 });
    page.drawText(String(item.quantity), { x: colX.qty, y, size: 9, font: helvetica, color: darkGray });
    page.drawText(`$${item.unitPrice.toFixed(2)}`, { x: colX.price, y, size: 9, font: helvetica, color: darkGray });
    page.drawText(`$${item.total.toFixed(2)}`, { x: colX.total, y, size: 9, font: helvetica, color: darkGray });
    y -= 20;
  }

  // Divider
  page.drawLine({ start: { x: margin, y: y + 5 }, end: { x: pageWidth - margin, y: y + 5 }, thickness: 0.5, color: lightGray });

  y -= 10;

  // ── Totals ──
  const totalsX = margin + 340;
  const totalsValX = margin + 440;

  page.drawText('Subtotal:', { x: totalsX, y, size: 10, font: helvetica, color: gray });
  page.drawText(`$${data.subtotal.toFixed(2)}`, { x: totalsValX, y, size: 10, font: helvetica, color: darkGray });
  y -= 18;

  page.drawText(`IVA (${data.ivaRate}%):`, { x: totalsX, y, size: 10, font: helvetica, color: gray });
  page.drawText(`$${data.ivaAmount.toFixed(2)}`, { x: totalsValX, y, size: 10, font: helvetica, color: darkGray });
  y -= 22;

  page.drawRectangle({ x: totalsX - 10, y: y - 5, width: contentWidth - (totalsX - margin) + 10, height: 22, color: pink });
  page.drawText('TOTAL:', { x: totalsX, y, size: 11, font: helveticaBold, color: white });
  page.drawText(`$${data.total.toFixed(2)} ${data.currency}`, { x: totalsValX, y, size: 11, font: helveticaBold, color: white });

  y -= 50;

  // ── Footer ──
  page.drawText('Thank you for your purchase.', { x: margin, y, size: 10, font: helvetica, color: gray });
  y -= 16;
  page.drawText('For questions, contact support@pink-lights.be or WhatsApp +32 478 02 64 79', {
    x: margin, y, size: 8, font: helvetica, color: gray,
  });

  // Bottom bar
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 30, color: pink });
  page.drawText('www.pink-lights.be', {
    x: pageWidth / 2 - helvetica.widthOfTextAtSize('www.pink-lights.be', 9) / 2,
    y: 10, size: 9, font: helvetica, color: white,
  });

  // ── Save and upload ──
  const pdfBytes = await doc.save();
  const fileName = `invoices/${data.invoiceId}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('invoices')
    .upload(fileName, pdfBytes, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Failed to upload PDF: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage
    .from('invoices')
    .getPublicUrl(fileName);

  return { pdfUrl: urlData.publicUrl };
}
