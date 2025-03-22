import { useState, FormEvent } from "react";
import { PaperclipIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomSendIcon } from "./icons/SendIcon";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onAttachmentClick: () => void;
}

export default function MessageInput({ onSendMessage, onAttachmentClick }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-[15px]">
      <form onSubmit={handleSubmit} className="flex items-center rounded-full bg-gray-100 px-[15px] py-[15px]">
        <Button 
          type="button"
          variant="ghost" 
          size="icon" 
          className="rounded-full h-9 w-9 hover:bg-gray-200" 
          onClick={onAttachmentClick}
        >
          <PaperclipIcon className="h-5 w-5 text-gray-500" />
        </Button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className="flex-1 bg-transparent p-2 focus:outline-none text-sm"
        />
        
        <Button 
          type="submit" 
          size="icon" 
          className={cn(
            "rounded-full h-9 w-9 ml-1 flex items-center justify-center", 
            message.trim() ? "bg-[#1A7F77] hover:bg-[#156c65]" : "bg-[#1A7F77]/70"
          )}
          disabled={!message.trim()}
        >
          <span className="flex items-center justify-center text-white pl-0.5">
            <CustomSendIcon />
          </span>
        </Button>
      </form>
    </div>
  );
}
