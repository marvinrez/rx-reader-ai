import { Copy } from "lucide-react";
import { Medication } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface PrescriptionResultProps {
  medications: Medication[];
}

export default function PrescriptionResult({ medications }: PrescriptionResultProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    const text = medications.map(med => 
      `${med.name}\n${med.dosage}${med.instructions ? `\n${med.instructions}` : ''}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Prescription details copied to clipboard",
        });
      })
      .catch(err => {
        toast({
          title: "Copy failed",
          description: "Could not copy to clipboard",
          variant: "destructive"
        });
      });
  };

  if (!medications || medications.length === 0) {
    return (
      <div className="flex mb-2">
        <div className="bg-[#1F9881] text-white rounded-lg py-3 px-4 max-w-xs">
          <p className="text-sm">No medications were detected in this prescription. Please try with a clearer image.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mb-2">
      <div className="bg-[#1F9881] text-white rounded-lg py-3 px-4 max-w-xs">
        <div className="space-y-2">
          {medications.map((medication, index) => (
            <div key={index}>
              <p className="font-medium">{medication.name}</p>
              <p className="text-sm">{medication.dosage}</p>
              {medication.instructions && <p className="text-sm">{medication.instructions}</p>}
              {index < medications.length - 1 && (
                <div className="w-full h-px bg-white opacity-20 my-2"></div>
              )}
            </div>
          ))}
          <div className="flex justify-end mt-1">
            <button onClick={handleCopy} className="focus:outline-none">
              <Copy className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
