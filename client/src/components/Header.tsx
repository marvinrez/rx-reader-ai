import { Button } from "@/components/ui/button";
import { MoreVertical, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from 'react';

const menuItemStyles = "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-gray-100 focus:bg-[#2A6F62] focus:text-white data-[state=open]:bg-[#2A6F62] data-[state=open]:text-white data-[highlighted]:bg-[#2A6F62] data-[highlighted]:text-white";

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-[15px] bg-[#E5F6F6] border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/images/app-logo.png" alt="RX Reader logo" className="h-9 w-auto object-contain" />
        </div>
        <h1 className="text-lg font-semibold leading-none ml-2">RX Reader</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="group relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 focus:ring-2 focus:ring-primary/50 focus:outline-none hover:bg-gray-100" // Added hover style
            aria-label="Important disclaimer about AI accuracy"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
          </Button>
          <div 
            className="absolute right-0 top-full mt-2 w-64 p-2 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
            role="tooltip"
            id="accuracy-disclaimer"
          >
            <p className="text-xs text-gray-700">
              AI responses may not be accurate. Always verify information with healthcare professionals.
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              aria-label="Options menu"
              className="focus:ring-2 focus:ring-primary/50 focus:outline-none hover:bg-gray-100"
            >
              <MoreVertical className="h-5 w-5  focus:text-white group-focus:text-white" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-2">
            <DropdownMenuItem className={menuItemStyles} onSelect={() => setAboutOpen(true)} aria-label="Learn more about the RX Reader">
              About
            </DropdownMenuItem>
            <DropdownMenuItem className={menuItemStyles} onSelect={() => setFaqOpen(true)} aria-label="Frequently asked questions">
              FAQ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
          <DialogContent className="sm:max-w-md" aria-labelledby="about-title">
            <DialogHeader>
              <DialogTitle id="about-title">About RX Reader AI</DialogTitle>
            </DialogHeader>
            <div className="px-3 py-4">
              <div className="mt-3">
                <h3 className="font-medium mb-2">Key Features & Safety Measures:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Uses advanced OCR and AI to interpret handwritten prescriptions</li>
                  <li>Multiple validation checks to ensure accuracy</li>
                  <li>Human review is required when interpretation is uncertain</li>
                  <li>The system is regularly reviewed for biases related to handwriting, regional terminology, and prescription ambiguity</li>
                  <li>Plans for GDPR compliance and future alignment with HIPAA standards are underway</li>
                </ul>
              </div>
              <p className="text-sm font-medium text-red-600 mt-2">
                <span aria-hidden="true">⚠️</span> <span>Important Disclaimer</span>
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
                  aria-label="Visit Marcos Rezende's website"
                >
                  Marcos Rezende
                </a>.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
          <DialogContent className="sm:max-w-md" aria-labelledby="faq-title">
            <DialogHeader>
              <DialogTitle id="faq-title">Frequently Asked Questions</DialogTitle>
            </DialogHeader>
            <div className="px-3 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">How is my data protected?</h3>
                  <p className="text-sm text-gray-700">Your data is processed securely and is not permanently stored.</p>
                </div>
                <div>
                  <h3 className="font-medium">What if the app can't read my prescription?</h3>
                  <p className="text-sm text-gray-700">Try taking a clearer photo with good lighting, or ask the AI directly for guidance.</p>
                </div>
                <div>
                  <h3 className="font-medium">Does the app provide medical advice?</h3>
                  <p className="text-sm text-gray-700">No, RX Reader only helps decode prescriptions. Always consult with a healthcare professional.</p>
                </div>
                <div>
                  <h3 className="font-medium">How can I get the best reading results?</h3>
                  <p className="text-sm text-gray-700">Take a well-lit, focused photo and frame the entire prescription in the image.</p>
                </div>
                <div lang="pt-BR">
                  <h3 className="font-medium">Are the alerts always accurate?</h3>
                  <p className="text-sm text-gray-700">Alerts are based on medical data, but always confirm with your doctor or pharmacist.</p>
                </div>
                <div lang="pt-BR">
                  <h3 className="font-medium">Can I use the app offline?</h3>
                  <p className="text-sm text-gray-700">RX Reader needs an internet connection to process images and provide results.</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}