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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Trap focus inside modal when it opens
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      
      // Handle keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        // Trap focus inside modal
        if (e.key === 'Tab') {
          // Define focusable elements
          const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          // If shift+tab and on first element, focus last element
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } 
          // If tab and on last element, loop back to first element
          else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);
  
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
    tempInput.accept = 'image/*,.webp,.pdf';
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
    tempInput.accept = 'image/*,.webp,.pdf';
    tempInput.capture = undefined; // Explicitly prevent camera capture

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-prescription-title"
    >
      <div className="bg-white w-full rounded-t-xl p-4 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 id="upload-prescription-title" className="text-lg font-medium">Upload Prescription</h3>
          <button 
            ref={closeButtonRef}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={onClose}
            aria-label="Close upload dialog"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Camera option */}
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary/50"
          onClick={openCamera}
          aria-label="Take photo with camera"
        >
          <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A7F77] group-hover:border-[#1A7F77] transition-colors">
            <Camera className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Camera</p>
            <p className="text-sm text-gray-700">Take a photo of your prescription</p>
          </div>
        </button>

        {/* Gallery option */}
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary/50"
          onClick={openGallery}
          aria-label="Choose from gallery"
        >
          <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A7F77] group-hover:border-[#1A7F77] transition-colors">
            <Image className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="font-medium text-lg">Photo Library</p>
            <p className="text-sm text-gray-700">Choose from your gallery</p>
          </div>
        </button>
      </div>
    </div>
  );
}