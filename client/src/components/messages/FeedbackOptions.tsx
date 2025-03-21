import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeedbackOptionsProps {
  onFeedback: (isAccurate: boolean) => void;
}

export default function FeedbackOptions({ onFeedback }: FeedbackOptionsProps) {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const handleFeedback = (isAccurate: boolean) => {
    setFeedback(isAccurate);
    onFeedback(isAccurate);
  };

  return (
    <div className="flex items-center space-x-2 ml-1 mb-3">
      <p className="text-sm text-gray-500">Is this answer accurate?</p>
      <button 
        className={cn(
          "p-1 rounded hover:bg-gray-100", 
          feedback === true && "text-primary"
        )}
        onClick={() => handleFeedback(true)}
        disabled={feedback !== null}
      >
        <ThumbsUp className="h-5 w-5" />
      </button>
      <button 
        className={cn(
          "p-1 rounded hover:bg-gray-100", 
          feedback === false && "text-red-500"
        )}
        onClick={() => handleFeedback(false)}
        disabled={feedback !== null}
      >
        <ThumbsDown className="h-5 w-5" />
      </button>
    </div>
  );
}
