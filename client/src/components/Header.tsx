import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function Header() {
  return (
    <header className="flex items-center justify-between p-[15px] bg-gradient-to-r from-[#E8F5FF] to-[#FFFFFF] border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/images/app-logo.png" alt="RX Reader logo" className="h-9 w-auto object-contain" />
        </div>
        <h1 className="text-lg font-semibold leading-none ml-2">RX Reader</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-500">
          AI responses may not be accurate. Always verify information with healthcare professionals.
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                FAQ
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                About
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}