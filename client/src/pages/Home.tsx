import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ChatContainer from "@/components/ChatContainer";
import MessageInput from "@/components/MessageInput";
import UploadModal from "@/components/UploadModal";
import { Message, Medication } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      prescriptionId: null,
      type: 'system',
      content: 'welcome',
      metadata: null,
      createdAt: new Date()
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeImageMutation = useMutation({
    mutationFn: async (imageBase64: string) => {
      const response = await apiRequest('POST', '/api/prescriptions/analyze', { imageBase64 });
      return response.json();
    },
    onSuccess: (data) => {
      setIsLoading(false);
      
      // Add the result to messages
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          prescriptionId: null,
          type: 'prescription',
          content: 'Prescription analysis result',
          metadata: { 
            medications: data.medications,
            unreadableImage: data.unreadableImage,
            additionalInfo: data.additionalInfo
          },
          createdAt: new Date()
        }
      ]);
    },
    onError: (error: any) => {
      setIsLoading(false);
      
      // Get the error message from the error object
      const errorMessage = error?.message || "Unable to process your image. Please try again.";
      
      // Determine alert type and user-friendly message
      let variant: "default" | "destructive" | "warning" = "destructive";
      let title = "Unable to read image";
      let description = errorMessage;
      
      // Override description for specific error types
      if (error.type === 'size') {
        variant = "warning";
        title = "Image too large";
        description = "Please use a smaller image or reduce the photo size.";
      } else if (error.type === 'api') {
        variant = "destructive";
        title = "Service temporarily unavailable";
        description = errorMessage;
      } else if (error.type === 'format') {
        variant = "warning";
        title = "Problem with image format";
        description = errorMessage;
      } else if (errorMessage.includes('format') || errorMessage.includes('image')) {
        variant = "warning";
        title = "Unsupported image format";
        description = "Please use a photo in JPG, PNG format or a PDF document.";
      }
      
      // Show toast notification
      toast({
        title: title,
        description: description,
        variant: variant
      });
      
      // Add error message to the chat
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          prescriptionId: null,
          type: 'system',
          content: 'error',
          metadata: { 
            message: description,
            errorType: error.type || 'general'
          },
          createdAt: new Date()
        }
      ]);
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest('POST', '/api/messages', { content });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 3,
          prescriptionId: null,
          type: 'ai',
          content: data.response,
          metadata: null,
          createdAt: new Date()
        }
      ]);
    },
    onError: (error: any) => {
      // Get the error message from the error object
      const errorMessage = error?.message || "Unable to process your message. Please try again.";
      
      // Determine alert type and user-friendly message
      let variant: "default" | "destructive" | "warning" = "destructive";
      let title = "Error sending message";
      let description = errorMessage;
      
      // Override description for specific error types
      if (error.type === 'api') {
        variant = "destructive";
        title = "Service temporarily unavailable";
        description = errorMessage;
      }
      
      // Show toast notification
      toast({
        title: title,
        description: description,
        variant: variant
      });
      
      // Add error message to the chat
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 3,
          prescriptionId: null,
          type: 'system',
          content: 'error',
          metadata: { 
            message: description,
            errorType: error.type || 'general'
          },
          createdAt: new Date()
        }
      ]);
    }
  });

  const submitFeedbackMutation = useMutation({
    mutationFn: async ({ messageId, isAccurate }: { messageId: number, isAccurate: boolean }) => {
      const response = await apiRequest('POST', '/api/feedbacks', { messageId, isAccurate });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! It helps us improve.",
      });
    }
  });

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message to the list
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        prescriptionId: null,
        type: 'user',
        content: message,
        metadata: null,
        createdAt: new Date()
      }
    ]);

    // Send message to backend
    sendMessageMutation.mutate(message);
  };

  const handleAttachmentClick = () => {
    setIsModalOpen(true);
  };

  // Function to compress image before sending
  const compressImage = async (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Calculate maximum dimensions of 1200px while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 1200;
        
        if (width > height && width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Quality 0.7 for JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };
    });
  };

  const handleUploadImage = async (base64Image: string) => {
    // Close modal
    setIsModalOpen(false);

    // Compress image before displaying and sending
    const compressedImage = await compressImage(base64Image);

    // Add image message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        prescriptionId: null,
        type: 'image',
        content: compressedImage,
        metadata: null,
        createdAt: new Date()
      }
    ]);

    // Set loading state
    setIsLoading(true);

    // Send compressed image to backend for analysis
    analyzeImageMutation.mutate(compressedImage.split(',')[1]);

    // Add disclaimer after the analysis
    // No additional disclaimer message needed
  };

  const handleFeedback = (messageId: number, isAccurate: boolean) => {
    submitFeedbackMutation.mutate({ messageId, isAccurate });
  };

  // Handle Help & FAQ button click from header
  useEffect(() => {
    const handleHelpFaq = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.showHelp) {
        // Add AI message with FAQ content
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            prescriptionId: null,
            type: 'ai',
            content: `### Frequently Asked Questions:

**Q: How accurate is the prescription reading?**
A: RX Reader uses advanced AI to interpret prescriptions, but accuracy may vary depending on image quality. Always verify with your healthcare provider.

**Q: Is my prescription data private?**
A: Yes, your prescription data is processed securely and not stored permanently.

**Q: What if the app can't read my prescription?**
A: Try taking a clearer photo with good lighting, or ask the AI for guidance directly.

**Q: Can the app provide medical advice?**
A: No, RX Reader only helps decode prescriptions. Always consult with a healthcare professional for medical advice.

**How else can I help you today?**`,
            metadata: null,
            createdAt: new Date()
          }
        ]);
      }
    };

    // Add event listener for the Help & FAQ button
    window.addEventListener('showHelpFaq', handleHelpFaq);

    // Clean up the event listener
    return () => {
      window.removeEventListener('showHelpFaq', handleHelpFaq);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-neutral-background to-white">
      <Header />
      
      <ChatContainer 
        messages={messages} 
        isLoading={isLoading}
        onFeedback={handleFeedback}
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        onAttachmentClick={handleAttachmentClick} 
      />
      
      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onUpload={handleUploadImage} 
      />
    </div>
  );
}
