import { X } from "lucide-react";

interface UploadedImageProps {
  image: string;
  onRemove?: () => void;
}

export default function UploadedImage({ image, onRemove }: UploadedImageProps) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-gray-100 rounded-lg p-2 max-w-xs shadow-sm">
        <div className="relative w-full overflow-hidden rounded-md bg-gray-200" style={{ maxWidth: "250px" }}>
          <img
            src={image}
            alt="Uploaded prescription"
            className="w-full h-auto object-cover"
          />
          {onRemove && (
            <button 
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1"
              onClick={onRemove}
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
