
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';

interface ImageUploadActionsProps {
  uploadingImages: boolean;
  hasSelectedImages: boolean;
  onUploadClick: () => void;
  onSkipClick: () => void;
  onChooseClick: () => void;
  selectedImagesCount: number;
}

const ImageUploadActions = ({
  uploadingImages,
  hasSelectedImages,
  onUploadClick,
  onSkipClick,
  onChooseClick,
  selectedImagesCount,
}: ImageUploadActionsProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        type="button"
        variant="default"
        disabled={uploadingImages}
        className="w-full"
        onClick={onChooseClick}
      >
        <Upload className="w-4 h-4 mr-2" />
        {uploadingImages ? 'Uploading...' : 'Choose Pictures'}
      </Button>

      <Button
        type="button"
        variant="default"
        disabled={uploadingImages || !hasSelectedImages}
        className="w-full"
        onClick={onUploadClick}
      >
        Upload {selectedImagesCount} {selectedImagesCount === 1 ? 'Picture' : 'Pictures'}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onSkipClick}
        className="w-full"
      >
        Skip for now
      </Button>
    </div>
  );
};

export default ImageUploadActions;
