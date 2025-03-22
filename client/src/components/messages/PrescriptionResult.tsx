import { Copy, AlertTriangle } from "lucide-react";
import { Medication } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface PrescriptionResultProps {
  medications: Medication[];
  unreadableImage?: boolean;
  additionalInfo?: string;
}

export default function PrescriptionResult({ medications, unreadableImage, additionalInfo }: PrescriptionResultProps) {
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

  if (unreadableImage || !medications || medications.length === 0) {
    return (
      <div className="flex mb-2">
        <div className="bg-[#017171] text-white rounded-lg py-3 px-[15px] max-w-xs"> {/* Changed px-4 to px-2 */}
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Unable to read prescription</p>
              <p className="text-sm mt-1">
                {additionalInfo || "No medications were detected in this prescription. Please try with a clearer image with good lighting."}
              </p>
              <p className="text-sm mt-2">
                Try these tips:
              </p>
              <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                <li>Take the photo in a well-lit area</li>
                <li>Ensure the prescription is flat and not creased</li>
                <li>Hold the camera steady to avoid blur</li>
                <li>Make sure all text is visible in the frame</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex mb-2">
      <div className="bg-[#017171] text-white rounded-lg py-3 px-[15px] max-w-xs"> {/* Changed px-4 to px-2 */}
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
          <div className="mt-4 pt-2 border-t border-white/20">
            <p className="text-xs text-white">Note: AI responses may not be 100% accurate. Always verify information with healthcare professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}