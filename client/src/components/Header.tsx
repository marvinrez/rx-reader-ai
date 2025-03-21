import { Button } from "@/components/ui/button";
import { Search, MoreVertical } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src="/images/app-logo.svg" alt="RX Reader logo" className="w-10 h-10" />
        </div>
        <div className="ml-3">
          <h1 className="text-lg font-semibold">RX Reader</h1>
          <button 
            onClick={() => {
              // Dispatch a custom event that will be caught by the Home component
              const helpEvent = new CustomEvent('showHelpFaq', { 
                detail: { 
                  showHelp: true 
                }
              });
              window.dispatchEvent(helpEvent);
            }}
            className="text-xs text-gray-500 hover:text-primary cursor-pointer"
          >
            Help & FAQ
          </button>
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
