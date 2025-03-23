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
    <div 
      className="flex items-center space-x-2 ml-1 mb-3" 
      role="group" 
      aria-labelledby="feedback-question"
    >
      <p id="feedback-question" className="text-sm text-gray-700">Is this answer accurate?</p>
      <button 
        className={cn(
          "p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50", 
          feedback === true && "text-primary"
        )}
        onClick={() => handleFeedback(true)}
        disabled={feedback !== null}
        aria-label="Yes, the answer is accurate"
        aria-pressed={feedback === true}
      >
        <ThumbsUp className="h-5 w-5" aria-hidden="true" />
      </button>
      <button 
        className={cn(
          "p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50", 
          feedback === false && "text-red-500"
        )}
        onClick={() => handleFeedback(false)}
        disabled={feedback !== null}
        aria-label="No, the answer is not accurate"
        aria-pressed={feedback === false}
      >
        <ThumbsDown className="h-5 w-5" aria-hidden="true" />
      </button>
      {feedback !== null && (
        <span className="text-xs text-gray-600" aria-live="polite">
          Thank you for your feedback
        </span>
      )}
    </div>
  );
}
