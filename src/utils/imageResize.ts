
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 0.8;

/**
 * Resize an image file client-side before upload.
 * Returns a new File with max width of 1200px, compressed as JPEG.
 */
export async function resizeImage(file: File): Promise<File> {
  // Skip non-image files
  if (!file.type.startsWith('image/')) return file;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Skip resize if already small enough
      if (img.width <= MAX_WIDTH) {
        resolve(file);
        return;
      }

      const ratio = MAX_WIDTH / img.width;
      const newWidth = MAX_WIDTH;
      const newHeight = Math.round(img.height * ratio);

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          const resizedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, '.jpg'),
            { type: 'image/jpeg' }
          );
          resolve(resizedFile);
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for resizing'));
    };

    img.src = url;
  });
}

/**
 * Resize multiple images in parallel.
 */
export async function resizeImages(files: File[]): Promise<File[]> {
  return Promise.all(files.map(resizeImage));
}
