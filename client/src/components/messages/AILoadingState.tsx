
import { Sparkles } from "lucide-react";

export default function AILoadingState() {
  return (
    <div className="flex mb-2">
      <div className="bg-[#2A7E78] text-white rounded-lg py-2 px-5 flex items-center space-x-2">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <p className="text-sm">I'll help you understand how to read this info—just a moment.</p>
      </div>
    </div>
  );
}
