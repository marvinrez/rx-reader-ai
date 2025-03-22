import { useRef, useEffect } from "react";
import WelcomeCard from "./messages/WelcomeCard";
import UserMessage from "./messages/UserMessage";
import UploadedImage from "./messages/UploadedImage";
import AIMessage from "./messages/AIMessage";
import AILoadingState from "./messages/AILoadingState";
import PrescriptionResult from "./messages/PrescriptionResult";
import FeedbackOptions from "./messages/FeedbackOptions";
import { Message } from "@shared/schema";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onFeedback: (messageId: number, isAccurate: boolean) => void;
}

export default function ChatContainer({ messages, isLoading, onFeedback }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const renderMessage = (message: Message, index: number) => {
    switch (message.type) {
      case 'system':
        if (message.content === 'welcome') {
          return <WelcomeCard key={`msg-${message.id}`} />;
        }
        return null;
        
      case 'user':
        return <UserMessage key={`msg-${message.id}`} content={message.content} />;
        
      case 'image':
        return <UploadedImage key={`msg-${message.id}`} image={message.content} />;
        
      case 'ai':
        return (
          <div key={`msg-${message.id}`}>
            <AIMessage content={message.content} />
            {/* Don't show feedback for loading messages */}
            {!messages[index + 1]?.type.includes('loading') && 
              index > 0 && 
              messages[index - 1]?.type === 'image' && (
                <FeedbackOptions onFeedback={(isAccurate) => onFeedback(message.id, isAccurate)} />
              )
            }
          </div>
        );
        
      case 'prescription':
        return (
          <div key={`msg-${message.id}`}>
            <PrescriptionResult 
              medications={message.metadata?.medications || []}
              unreadableImage={message.metadata?.unreadableImage}
              additionalInfo={message.metadata?.additionalInfo}
            />
            <FeedbackOptions onFeedback={(isAccurate) => onFeedback(message.id, isAccurate)} />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="flex-1 overflow-y-auto p-[15px] space-y-4"
      style={{ height: 'calc(100vh - 70px - 60px)' }}
    >
      {messages.map((message, index) => renderMessage(message, index))}
      
      {isLoading && <AILoadingState />}
    </div>
  );
}
