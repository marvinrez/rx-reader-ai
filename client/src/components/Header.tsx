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
import React from 'react';

export default function Header() {
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
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem >
              {/*Removed onSelect to avoid unnecessary click handling*/}
              About
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog>
          <DialogContent className="sm:max-w-md">
            <div className="px-3 py-4">
              <h2 className="text-lg font-semibold">About RX Reader AI</h2>
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
      </div>
    </header>
  );
}