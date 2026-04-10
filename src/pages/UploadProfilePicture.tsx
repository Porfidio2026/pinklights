import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ImagePreviewGrid from '@/components/upload/ImagePreviewGrid';
import ImageUploadActions from '@/components/upload/ImageUploadActions';
import { PreviewImage } from '@/types/images';
import { useProfileForm } from '@/hooks/useProfileForm';
import { validateImageFiles } from '@/utils/imageValidation';
import { resizeImage } from '@/utils/imageResize';

const MAX_IMAGES = 50;

const UploadProfilePicture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [uploadingImages, setUploadingImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);
  const profileData = location.state?.profileData;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { checkAvailabilities } = useProfileForm();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to upload your profile pictures",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      if (!profileData) {
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (profileError || !existingProfile) {
          toast({
            title: "Profile Required",
            description: "Please complete your profile information first",
          });
          navigate('/create-profile');
          return;
        }
      }
    };

    checkAuth();
  }, [navigate, toast, location.state, profileData]);

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (selectedImages.length + files.length > MAX_IMAGES) {
      toast({
        title: "Too many images",
        description: `You can only upload up to ${MAX_IMAGES} images`,
        variant: "destructive",
      });
      return;
    }

    const validation = validateImageFiles(files);
    if (!validation.valid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    const newImages = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setSelectedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleUpload = async () => {
    try {
      setUploadingImages(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No user session found');

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      for (let i = 0; i < selectedImages.length; i++) {
        const resizedFile = await resizeImage(selectedImages[i].file);
        const fileExt = resizedFile.name.split('.').pop();
        const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('profile_pictures')
          .upload(filePath, resizedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('profile_pictures')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('profile_pictures')
          .insert({
            profile_id: profile.id,
            picture_url: publicUrl,
            is_main_picture: i === 0 && selectedImages.length === 1,
            display_order: i
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Success",
        description: "Pictures uploaded successfully",
      });

      const hasAvailabilities = await checkAvailabilities(session.user.id);
      
      if (!hasAvailabilities) {
        navigate('/set-availabilities');
      } else {
        navigate('/home');
      }

    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload pictures",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Add Profile Pictures</h1>

          <div className="space-y-6">
            {selectedImages.length > 0 && (
              <ImagePreviewGrid
                images={selectedImages}
                onRemove={removeImage}
              />
            )}

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleImageSelection}
              disabled={uploadingImages}
              className="hidden"
            />

            <ImageUploadActions
              uploadingImages={uploadingImages}
              hasSelectedImages={selectedImages.length > 0}
              onUploadClick={handleUpload}
              onSkipClick={() => navigate('/set-availabilities')}
              onChooseClick={handleButtonClick}
              selectedImagesCount={selectedImages.length}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
