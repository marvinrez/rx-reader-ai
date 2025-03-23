
import { Sparkles } from "lucide-react";

export default function AILoadingState() {
  return (
    <div className="flex mb-2">
      <div 
        className="bg-[#2A7E78] text-white rounded-lg py-2 px-5 flex items-center space-x-2"
        role="status"
        aria-live="polite"
        aria-label="AI is processing your request"
      >
        <Sparkles className="h-4 w-4 animate-pulse" aria-hidden="true" />
        <p className="text-sm flex items-center">
          I'll help you understand how to read this info
          <span className="ml-[2px] flex" aria-hidden="true">
            <span className="animate-[pulse_1.4s_infinite]">.</span>
            <span className="animate-[pulse_1.4s_0.2s_infinite]">.</span>
            <span className="animate-[pulse_1.4s_0.4s_infinite]">.</span>
          </span>
        </p>
      </div>
    </div>
  );
}
