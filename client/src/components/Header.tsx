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

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-[15px] bg-gradient-to-r from-[#E8F5FF] to-[#FFFFFF] border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/images/app-logo.png" alt="RX Reader logo" className="h-9 w-auto object-contain" />
        </div>
        <h1 className="text-lg font-semibold leading-none ml-2">RX Reader</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="group relative">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Info className="h-4 w-4" />
          </Button>
          <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <p className="text-xs text-gray-500">
              AI responses may not be accurate. Always verify information with healthcare professionals.
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              aria-label="Menu de opções"
              role="button"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onSelect={() => setAboutOpen(true)}
              title="Saiba mais sobre o RX Reader"
            >
              About
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFaqOpen(true)} title="Perguntas frequentes">
              FAQ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>About RX Reader AI</DialogTitle>
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
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Frequently Asked Questions</DialogTitle>
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
                <div>
                  <h3 className="font-medium">Os alertas são sempre precisos?</h3>
                  <p className="text-sm text-gray-700">Os alertas são baseados em dados médicos, mas sempre confirme com seu médico ou farmacêutico.</p>
                </div>
                <div>
                  <h3 className="font-medium">Posso usar o app offline?</h3>
                  <p className="text-sm text-gray-700">O RX Reader precisa de conexão com internet para processar as imagens e fornecer resultados.</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}