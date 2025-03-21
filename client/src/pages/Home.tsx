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
          metadata: { medications: data.medications },
          createdAt: new Date()
        }
      ]);
    },
    onError: (error: any) => {
      setIsLoading(false);
      
      // Determinar o tipo de alerta com base no tipo de erro
      let variant: "default" | "destructive" | "warning" = "destructive";
      let title = "Erro na análise da prescrição";
      
      if (error.type === 'size') {
        variant = "warning";
        title = "Imagem muito grande";
      } else if (error.type === 'api') {
        variant = "destructive";
        title = "Erro da API OpenAI";
      }
      
      toast({
        title: title,
        description: error.message || "Falha ao analisar a imagem. Por favor, tente novamente.",
        variant: variant
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
    onError: (error: any) => {
      // Determinar o tipo de alerta com base no tipo de erro
      let variant: "default" | "destructive" | "warning" = "destructive";
      let title = "Erro ao enviar mensagem";
      
      if (error.type === 'api') {
        variant = "destructive";
        title = "Erro da API OpenAI";
      }
      
      toast({
        title: title,
        description: error.message || "Falha ao enviar sua mensagem. Por favor, tente novamente.",
        variant: variant
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
        title: "Feedback enviado",
        description: "Obrigado pelo seu feedback! Isso nos ajuda a melhorar.",
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

  // Função para comprimir imagem antes do envio
  const compressImage = async (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Calcular dimensões máximas de 1200px mantendo proporção
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
        
        // Qualidade 0.7 para JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };
    });
  };

  const handleUploadImage = async (base64Image: string) => {
    // Close modal
    setIsModalOpen(false);

    // Comprimir imagem antes de exibir e enviar
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
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        prescriptionId: null,
        type: 'ai',
        content: "Vou ajudar você a entender como ler essas informações—só um momento.",
        metadata: null,
        createdAt: new Date()
      }
    ]);

    // Send compressed image to backend for analysis
    analyzeImageMutation.mutate(compressedImage.split(',')[1]);
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
            content: `# Ajuda & Perguntas Frequentes do RX Reader

### Como usar o RX Reader:
1. Envie uma imagem clara da sua receita usando o ícone de clipe de papel
2. Aguarde enquanto a IA analisa a escrita
3. Revise as informações decodificadas dos medicamentos
4. Faça perguntas adicionais sobre seus medicamentos

### Perguntas Frequentes:

**P: Qual é a precisão da leitura de receitas?**
R: O RX Reader usa IA avançada para interpretar receitas, mas a precisão pode variar dependendo da qualidade da imagem. Sempre verifique com seu médico ou farmacêutico.

**P: Meus dados de prescrição são privados?**
R: Sim, seus dados de prescrição são processados com segurança e não são armazenados permanentemente.

**P: E se o aplicativo não conseguir ler minha receita?**
R: Tente tirar uma foto mais clara com boa iluminação, ou peça orientação diretamente à IA.

**P: O aplicativo pode fornecer conselhos médicos?**
R: Não, o RX Reader apenas ajuda a decodificar receitas. Sempre consulte um profissional de saúde para aconselhamento médico.

**Como mais posso ajudar você hoje?**`,
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
