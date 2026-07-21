import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAdminProfileForm } from '@/hooks/useAdminProfileForm';
import { LocationInput } from '@/components/profile/LocationInput';
import { AboutMeInput } from '@/components/profile/AboutMeInput';
import { BasicInfoInput } from '@/components/profile/BasicInfoInput';
import { CharacteristicsInput } from '@/components/profile/CharacteristicsInput';
import { ServiceAndGenderInput } from '@/components/profile/ServiceAndGenderInput';
import { PhoneNumberInput } from '@/components/profile/PhoneNumberInput';
import ImagePreviewGrid from '@/components/upload/ImagePreviewGrid';
import { validateImageFiles } from '@/utils/imageValidation';
import { resizeImage } from '@/utils/imageResize';
import { PreviewImage } from '@/types/images';
import { Loader2, ImagePlus } from 'lucide-react';

const MAX_IMAGES = 50;

const AdminCreateProfile = () => {
  const { id: editId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { formData, setFormData, loading, initialLoading, isEditMode, handleSubmit, resetForm } = useAdminProfileForm(editId);

  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (selectedImages.length + files.length > MAX_IMAGES) {
      toast({
        title: 'Too many images',
        description: `You can only upload up to ${MAX_IMAGES} images`,
        variant: 'destructive',
      });
      return;
    }

    const validation = validateImageFiles(files);
    if (!validation.valid) {
      toast({
        title: 'Invalid file',
        description: validation.error,
        variant: 'destructive',
      });
      return;
    }

    const newImages = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].previewUrl);
      next.splice(index, 1);
      return next;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }

    // 1. Create or update the profile
    const profile = await handleSubmit();
    if (!profile) return;

    // 2. Upload images if any
    if (selectedImages.length > 0) {
      setUploading(true);
      try {
        let mainPictureUrl: string | null = null;

        for (let i = 0; i < selectedImages.length; i++) {
          const resized = await resizeImage(selectedImages[i].file);
          const storagePath = `bulk/${profile.id}/${crypto.randomUUID()}.jpg`;

          const { error: uploadError } = await supabase.storage
            .from('profile_pictures')
            .upload(storagePath, resized, { contentType: 'image/jpeg' });

          if (uploadError) {
            console.error(`Upload failed for image ${i}:`, uploadError);
            continue;
          }

          const { data: urlData } = supabase.storage
            .from('profile_pictures')
            .getPublicUrl(storagePath);

          await supabase.from('profile_pictures').insert({
            profile_id: profile.id,
            picture_url: urlData.publicUrl,
            is_main_picture: i === 0 && !isEditMode,
            display_order: i,
          });

          if (i === 0 && !isEditMode) mainPictureUrl = urlData.publicUrl;
        }

        if (mainPictureUrl) {
          await supabase
            .from('profiles')
            .update({ profile_picture_url: mainPictureUrl })
            .eq('id', profile.id);
        }
      } catch (err) {
        console.error('Image upload error:', err);
        toast({
          title: 'Warning',
          description: `Profile ${isEditMode ? 'updated' : 'created'} but some images failed to upload`,
          variant: 'destructive',
        });
      } finally {
        setUploading(false);
      }
    }

    // 3. Clean up previews and navigate
    selectedImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setSelectedImages([]);
    if (!isEditMode) resetForm();

    toast({ title: `Profile ${isEditMode ? 'updated' : 'created'} successfully` });
    navigate('/admin/profiles');
  };

  const isSubmitting = loading || uploading;

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Profile' : 'Create Profile'}</h1>

      <Card className="p-6">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <ServiceAndGenderInput formData={formData} setFormData={setFormData} />
          <BasicInfoInput formData={formData} setFormData={setFormData} />
          <PhoneNumberInput formData={formData} setFormData={setFormData} />
          <LocationInput formData={formData} setFormData={setFormData} skipProfileUpdate />
          <AboutMeInput formData={formData} setFormData={setFormData} />
          <CharacteristicsInput formData={formData} setFormData={setFormData} />

          {/* Image Upload Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Profile Pictures</h3>

            {selectedImages.length > 0 && (
              <ImagePreviewGrid images={selectedImages} onRemove={removeImage} />
            )}

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageSelection}
              disabled={isSubmitting}
              className="hidden"
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Pictures ({selectedImages.length})
            </Button>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {uploading ? 'Uploading images...' : isEditMode ? 'Updating profile...' : 'Creating profile...'}
              </>
            ) : (
              isEditMode ? 'Update Profile' : 'Create Profile'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminCreateProfile;
