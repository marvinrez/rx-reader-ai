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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-4 py-1.5 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/images/app-logo.png" alt="RX Reader logo" className="h-9 w-auto object-contain" />
        </div>
        <div className="ml-2">
          <h1 className="text-lg font-semibold leading-none">RX Reader</h1>
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
            className="text-xs text-gray-500 hover:text-primary cursor-pointer mt-0.5"
          >
            Help & FAQ
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Sobre o RX Reader</DialogTitle>
              <DialogDescription>
                RX Reader é uma aplicação que utiliza inteligência artificial para interpretar receitas médicas manuscritas. 
                Simplesmente envie uma foto da sua receita médica e deixe que o RX Reader decodifique os nomes dos medicamentos e instruções para você.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-3 mt-4">
              <p className="text-sm">
                Este é um projeto de experimentação criado por{" "}
                <a 
                  href="https://www.marcosrezende.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Marcos Rezende
                </a>.
              </p>
              <p className="text-sm text-gray-500">
                Desenvolvido como uma demonstração de tecnologia e não deve ser utilizado como substituto para orientação médica profissional.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
