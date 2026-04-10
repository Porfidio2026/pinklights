
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { validateImageFile } from '@/utils/imageValidation';
import { resizeImage } from '@/utils/imageResize';

const CreateAd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Parse URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const editAdId = queryParams.get('edit');

  useEffect(() => {
    const checkPartner = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to create an advertisement",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { data: partner } = await supabase
        .from('partners')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (!partner) {
        toast({
          title: "Partner Account Required",
          description: "Please create a partner account first",
          variant: "destructive",
        });
        navigate('/create-partner');
        return;
      }

      setPartnerId(partner.id);

      // If editing, fetch the ad details
      if (editAdId) {
        setIsEditing(true);
        setEditingAdId(editAdId);
        
        try {
          const { data: ad, error } = await supabase
            .from('partner_ads')
            .select('*')
            .eq('id', editAdId)
            .eq('partner_id', partner.id)
            .single();

          if (error) throw error;
          
          if (ad) {
            setTitle(ad.title);
            setDescription(ad.description || '');
            setDestinationUrl(ad.destination_url || '');
            setImagePreview(ad.image_url);
          }
        } catch (error) {
          console.error('Error fetching ad details:', error);
          toast({
            title: "Error",
            description: "Failed to load advertisement details",
            variant: "destructive",
          });
          navigate('/edit-ads');
        }
      }
      
      setLoading(false);
    };

    checkPartner();
  }, [navigate, toast, editAdId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast({
          title: "Invalid file",
          description: validation.error,
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!imageFile && !isEditing) || !partnerId) return;

    setIsSubmitting(true);

    try {
      let imageUrl = imagePreview;
      
      // Upload new image if provided
      if (imageFile) {
        const resizedFile = await resizeImage(imageFile);
        const fileExt = resizedFile.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('ad-images')
          .upload(filePath, resizedFile);

        if (uploadError) throw uploadError;

        // Get the public URL of the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('ad-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      if (isEditing && editingAdId) {
        // Update existing ad
        const { error: dbError } = await supabase
          .from('partner_ads')
          .update({
            title,
            description,
            destination_url: destinationUrl,
            ...(imageUrl !== imagePreview ? { image_url: imageUrl } : {})
          })
          .eq('id', editingAdId)
          .eq('partner_id', partnerId);

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: "Your advertisement has been updated",
        });
      } else {
        // Create new ad
        const { error: dbError } = await supabase
          .from('partner_ads')
          .insert({
            partner_id: partnerId,
            title,
            description,
            destination_url: destinationUrl,
            image_url: imageUrl,
            view_count: 0,
            click_count: 0
          });

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: "Your advertisement has been created",
        });
      }

      // Redirect to edit ads page instead of dashboard
      navigate('/edit-ads');

    } catch (error) {
      console.error('Error creating/updating ad:', error);
      toast({
        title: "Error",
        description: "Failed to save advertisement",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/edit-ads');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="mb-4"
        >
          Back to Ads
        </Button>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                {isEditing ? 'Edit Advertisement' : 'Create New Advertisement'}
              </h1>
              <p className="text-muted-foreground">
                {isEditing 
                  ? 'Update your advertisement details below'
                  : 'Create an engaging advertisement to promote your business'
                }
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter advertisement title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter advertisement description"
                  required
                />
              </div>

              <div>
                <Label htmlFor="destinationUrl">Destination URL</Label>
                <Input
                  id="destinationUrl"
                  type="url"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Advertisement Image</Label>
                <div className="mt-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Ad preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full max-w-md h-48 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted">
                        <ImagePlus className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      {imagePreview ? 'Change Image' : 'Upload Image'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || (!imageFile && !isEditing)}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Update Advertisement' : 'Create Advertisement'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateAd;
