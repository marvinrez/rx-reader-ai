import { Sparkles } from "lucide-react";

export default function AILoadingState() {
  return (
    <div className="flex mb-2">
      <div className="bg-primary text-white rounded-lg py-3 px-4 max-w-xs flex items-center space-x-1">
        <Sparkles className="h-5 w-5 text-primary-light animate-pulse" />
        <p className="text-sm">Analyzing your prescription...</p>
      </div>
    </div>
  );
}
