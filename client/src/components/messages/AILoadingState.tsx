
import { Sparkles } from "lucide-react";

export default function AILoadingState() {
  return (
    <div className="flex mb-2">
      <div className="bg-[#1A7F77] text-white rounded-lg py-3 px-4 max-w-xs flex items-center space-x-2 animate-pulse">
        <Sparkles className="h-5 w-5 text-white" />
        <p className="text-sm">I'll help you understand how to read this info—just a moment.</p>
      </div>
    </div>
  );
}
