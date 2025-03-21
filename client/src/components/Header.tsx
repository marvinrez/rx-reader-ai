import { Button } from "@/components/ui/button";
import { Search, MoreVertical } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="ml-3">
          <h1 className="text-lg font-semibold">RX Reader</h1>
          <p className="text-xs text-gray-500">Help & FAQ</p>
        </div>
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 ml-1">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
