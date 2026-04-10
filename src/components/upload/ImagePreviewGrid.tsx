
import React from 'react';
import { X } from 'lucide-react';
import { PreviewImage } from '@/types/images';

interface ImagePreviewGridProps {
  images: PreviewImage[];
  onRemove: (index: number) => void;
}

const ImagePreviewGrid = ({ images, onRemove }: ImagePreviewGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-square">
          <img
            src={image.previewUrl}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewGrid;
