import { useRef, useEffect } from "react";
import WelcomeCard from "./messages/WelcomeCard";
import UserMessage from "./messages/UserMessage";
import UploadedImage from "./messages/UploadedImage";
import AIMessage from "./messages/AIMessage";
import AILoadingState from "./messages/AILoadingState";
import PrescriptionResult from "./messages/PrescriptionResult";
import FeedbackOptions from "./messages/FeedbackOptions";
import ErrorMessage from "./messages/ErrorMessage";
import { Message, Medication } from "@shared/schema";

interface ErrorMetadata {
  message: string;
  errorType: string;
}

interface PrescriptionMetadata {
  medications: Medication[];
  unreadableImage?: boolean;
  additionalInfo?: string;
}

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
          return (
            <div role="group" aria-label="Welcome message">
              <WelcomeCard key={`msg-${message.id}`} />
            </div>
          );
        } else if (message.content === 'error' && message.metadata) {
          const errorMetadata = message.metadata as ErrorMetadata;
          return (
            <div role="alert" aria-live="assertive">
              <ErrorMessage 
                key={`msg-${message.id}`}
                message={errorMetadata.message}
                errorType={errorMetadata.errorType}
              />
            </div>
          );
        }
        return null;

      case 'user':
        return (
          <div role="group" aria-label="Your message">
            <UserMessage key={`msg-${message.id}`} content={message.content} />
          </div>
        );

      case 'image':
        return (
          <div role="group" aria-label="Uploaded prescription image">
            <UploadedImage key={`msg-${message.id}`} image={message.content} />
          </div>
        );

      case 'ai':
        return (
          <div key={`msg-${message.id}`} role="group" aria-label="AI response">
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
        const metadata = message.metadata as PrescriptionMetadata | null;
        
        return (
          <div key={`msg-${message.id}`} role="group" aria-label="Prescription analysis results">
            <PrescriptionResult 
              medications={metadata?.medications || []}
              unreadableImage={metadata?.unreadableImage}
              additionalInfo={metadata?.additionalInfo}
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
      className="flex-1 overflow-y-auto px-[15px] py-4"
      style={{ height: 'calc(100vh - 70px - 60px)' }}
      role="log"
      aria-live="polite"
      aria-label="Conversation history"
      aria-atomic="false"
    >
      {messages.length === 0 ? (
        <div 
          className="h-full flex items-center justify-center" 
          role="region" 
          aria-label="Welcome"
        >
          <WelcomeCard />
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div 
              key={`msg-container-${message.id}`} 
              aria-atomic="true"
              className="mb-4"
            >
              {renderMessage(message, index)}
            </div>
          ))}
        </>
      )}

      {isLoading && (
        <div aria-live="polite" role="status">
          <AILoadingState />
        </div>
      )}
    </div>
  );
}