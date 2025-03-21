import { useRef, useEffect } from "react";
import { Camera, Image, X } from "lucide-react";
import { fileToDataURL } from "@/lib/utils";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (base64Image: string) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  // Separate references for each input
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  
  if (!isOpen) return null;

  // Function to process files
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await fileToDataURL(file);
        onUpload(dataUrl);
        // Close modal after upload
        onClose();
      } catch (error) {
        console.error("Error converting file to data URL:", error);
      }
      // Reset input
      e.target.value = '';
    }
  };

  // Function that FORCIBLY opens the camera
  const openCamera = () => {
    // Create a temporary element to ensure it's always a new instance
    const tempInput = document.createElement('input');
    tempInput.type = 'file';
    tempInput.accept = 'image/*';
    tempInput.capture = 'environment'; // Forces camera to open
    
    // When the file is selected
    tempInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        try {
          const dataUrl = await fileToDataURL(file);
          onUpload(dataUrl);
          onClose(); // Close after upload
        } catch (error) {
          console.error("Error processing camera image:", error);
        }
      }
    };
    
    // Open the camera programmatically
    tempInput.click();
  };

  // Function to open the gallery 
  const openGallery = () => {
    // Same pattern: create a temporary element
    const tempInput = document.createElement('input');
    tempInput.type = 'file';
    tempInput.accept = 'image/*';
    // We don't define capture to open the gallery
    
    // When the file is selected
    tempInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        try {
          const dataUrl = await fileToDataURL(file);
          onUpload(dataUrl);
          onClose(); // Close after upload
        } catch (error) {
          console.error("Error processing gallery image:", error);
        }
      }
    };
    
    // Open the gallery programmatically
    tempInput.click();
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

        {/* Camera option */}
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
          onClick={openCamera}
        >
          <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A7F77] group-hover:border-[#1A7F77] transition-colors">
            <Camera className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Camera</p>
            <p className="text-sm text-gray-500">Take a photo of your prescription</p>
          </div>
        </button>

        {/* Gallery option */}
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group"
          onClick={openGallery}
        >
          <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A7F77] group-hover:border-[#1A7F77] transition-colors">
            <Image className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
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