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
                  <p className="font-medium">How does the confidence mode work?</p>
                  <p className="text-sm text-gray-600">When the AI is uncertain about its interpretation, it will explicitly indicate this and may ask for a clearer image or additional context.</p>
                </div>
                <div>
                  <p className="font-medium">How do you handle data privacy?</p>
                  <p className="text-sm text-gray-600">We use end-to-end encryption and process all data without permanent storage. Your prescription data is completely private and secure.</p>
                </div>
                <div>
                  <p className="font-medium">What happens if the AI is unsure about interpretation?</p>
                  <p className="text-sm text-gray-600">The system will notify you of its uncertainty and may request additional information or a clearer image to ensure accuracy.</p>
                </div>
                <div>
                  <p className="font-medium">How do you handle regional differences in prescriptions?</p>
                  <p className="text-sm text-gray-600">Our system is regularly reviewed and updated to account for regional terminology and prescription formats across different healthcare systems.</p>
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
              <p className="text-sm font-medium text-primary">
                Privacy & Responsibility First
              </p>
              <div className="text-sm text-gray-700 space-y-2">
                <p>Healthcare data is sensitive — RX Reader was designed with privacy and responsibility first:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>All data is processed without persistent storage</li>
                  <li>End-to-end encryption is enforced from input to interpretation</li>
                  <li>A "confidence mode" warns users when AI interpretation is uncertain</li>
                  <li>The system is regularly reviewed for biases related to handwriting, regional terminology, and prescription ambiguity</li>
                  <li>Plans for GDPR compliance and future alignment with HIPAA standards are underway</li>
                </ul>
              </div>
              <p className="text-sm font-medium text-red-600 mt-2">
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
              </p>e<br/>
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