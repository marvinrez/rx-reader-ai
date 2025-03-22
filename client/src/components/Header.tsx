import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical, X, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-[15px] bg-gradient-to-r from-[#E8F5FF] to-[#FFFFFF] border-b border-gray-200"> {/* Changed background */}
      <div className="flex items-center">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/images/app-logo.png" alt="RX Reader logo" className="h-9 w-auto object-contain" />
        </div>
        <div className="ml-2">
          <h1 className="text-lg font-semibold leading-none">RX Reader</h1>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs text-gray-500 hover:text-primary cursor-pointer mt-0.5">
                FAQ
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Frequently Asked Questions</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">How accurate is the prescription reading?</p>
                  <p className="text-sm text-gray-600">RX Reader uses advanced AI to interpret prescriptions, but accuracy may vary depending on image quality. Always verify with your healthcare provider.</p>
                </div>
                <div>
                  <p className="font-medium">Is my prescription data private?</p>
                  <p className="text-sm text-gray-600">Yes, your prescription data is processed securely and not stored permanently.</p>
                </div>
                <div>
                  <p className="font-medium">What if the app can't read my prescription?</p>
                  <p className="text-sm text-gray-600">Try taking a clearer photo with good lighting, or ask the AI for guidance directly.</p>
                </div>
                <div>
                  <p className="font-medium">Can the app provide medical advice?</p>
                  <p className="text-sm text-gray-600">No, RX Reader only helps decode prescriptions. Always consult with a healthcare professional for medical advice.</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex items-center">
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-9 w-9 hover:bg-gray-100"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>About this project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>About RX Reader</DialogTitle>
              <DialogDescription>
                RX Reader is an experimental application that uses artificial intelligence to assist in interpreting handwritten medical prescriptions. While it aims to help decode prescriptions, it's important to understand its limitations.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-3 mt-4">
              <p className="text-sm font-medium text-red-600">
                ⚠️ Important Disclaimer
              </p>
              <p className="text-sm text-gray-700">
                This AI system may make mistakes in interpretation and should never be used as the sole source for medical decisions. Always verify all information with your healthcare provider and pharmacist.
              </p>
              <p className="text-sm text-gray-700">
                This is an experimental project created by{" "}
                <a 
                  href="https://www.marcosrezende.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Marcos Rezende
                </a>.
              </p>
              <p className="text-sm text-gray-600">
                • Not a substitute for professional medical guidance<br/>
                • May contain errors or misinterpretations<br/>
                • Always consult healthcare professionals<br/>
                • For reference purposes only
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}