import { useRef } from "react";
import { Camera, Image, X } from "lucide-react";
import { fileToDataURL } from "@/lib/utils";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (base64Image: string) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await fileToDataURL(file);
        onUpload(dataUrl);
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error("Error converting file to data URL:", error);
      }
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      // Remove the capture attribute to allow selecting from gallery
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-end items-center z-10"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full rounded-t-xl p-4 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Upload Prescription</h3>
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          capture="environment"
          onChange={handleFileChange}
        />

        {/* Camera option */}
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => {
            // Make sure the capture attribute is set for camera
            if (fileInputRef.current) {
              fileInputRef.current.setAttribute('capture', 'environment');
              fileInputRef.current.click();
            }
          }}
        >
          <div className="w-12 h-12 bg-[#017171] rounded-full flex items-center justify-center flex-shrink-0">
            <Camera className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Camera</p>
            <p className="text-sm text-gray-500">Take a photo of your prescription</p>
          </div>
        </button>

        {/* Gallery option */}
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={openFilePicker}
        >
          <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <Image className="h-6 w-6 text-gray-600" />
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Photos</p>
            <p className="text-sm text-gray-500">Choose from your gallery</p>
          </div>
        </button>
      </div>
    </div>
  );
}
