import { useState } from "react";
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
          metadata: { medications: data.medications },
          createdAt: new Date()
        }
      ]);
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error analyzing prescription",
        description: error.message || "Failed to analyze the image. Please try again.",
        variant: "destructive"
      });
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
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Failed to send your message. Please try again.",
        variant: "destructive"
      });
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

  const handleUploadImage = async (base64Image: string) => {
    // Close modal
    setIsModalOpen(false);

    // Add image message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        prescriptionId: null,
        type: 'image',
        content: base64Image,
        metadata: null,
        createdAt: new Date()
      }
    ]);

    // Set loading state
    setIsLoading(true);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        prescriptionId: null,
        type: 'ai',
        content: "I'll help you understand how to read this info—just a moment.",
        metadata: null,
        createdAt: new Date()
      }
    ]);

    // Send to backend for analysis
    analyzeImageMutation.mutate(base64Image.split(',')[1]);
  };

  const handleFeedback = (messageId: number, isAccurate: boolean) => {
    submitFeedbackMutation.mutate({ messageId, isAccurate });
  };

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
