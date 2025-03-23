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
            loading="lazy"
            onError={(e) => {
              console.error("Image failed to load");
              e.currentTarget.alt = "Image failed to load";
              e.currentTarget.style.height = "100px";
              e.currentTarget.style.display = "flex";
              e.currentTarget.style.alignItems = "center";
              e.currentTarget.style.justifyContent = "center";
            }}
          />
          {onRemove && (
            <button 
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={onRemove}
              aria-label="Remove image"
            >
              <X className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
