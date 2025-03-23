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
      `${med.name}\n${med.dosage}${med.instructions ? `\n${med.instructions}` : ''}${med.warning ? `\n⚠️ ${med.warning}` : ''}${med.interactions ? `\n⚠️ Interações: ${med.interactions.join(', ')}` : ''}${med.pregnancyRisk ? `\n👶 ${med.pregnancyRisk}` : ''}${med.renalRisk ? `\n🩺 ${med.renalRisk}` : ''}`
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
        <div className="bg-[#017171] text-white rounded-lg py-3 px-[15px] max-w-xs" role="alert">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-white shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-medium">Unable to read prescription</h3>
              <p className="text-sm mt-1">
                {additionalInfo || "No medications were detected in this prescription. Please try with a clearer image with good lighting."}
              </p>
              <h4 className="text-sm mt-2 font-medium">
                Try these tips:
              </h4>
              <ul className="text-sm list-disc pl-5 mt-1 space-y-1" aria-label="Tips for better prescription photos">
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
      <div 
        className="bg-[#017171] text-white rounded-lg py-3 px-[15px] max-w-xs" 
        role="region" 
        aria-label="Prescription medications"
      >
        <div className="space-y-2">
          {medications.map((medication, index) => (
            <div key={index} className="medication-item">
              <h3 className="font-medium">{medication.name}</h3>
              <p className="text-sm">{medication.dosage}</p>
              {medication.instructions && <p className="text-sm">{medication.instructions}</p>}
              {medication.warning && (
                <div className="mt-1 flex items-start gap-1.5" role="alert">
                  <AlertTriangle className="h-4 w-4 text-yellow-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-yellow-300">{medication.warning}</p>
                </div>
              )}
              {medication.interactions && medication.interactions.length > 0 && (
                <div className="mt-1" role="alert">
                  <p className="text-sm text-yellow-200">
                    <span aria-hidden="true">⚠️</span> Interactions: {medication.interactions.join(', ')}
                  </p>
                </div>
              )}
              {medication.pregnancyRisk && (
                <div className="mt-1">
                  <p className="text-sm">
                    <span aria-hidden="true">👶</span> {medication.pregnancyRisk}
                  </p>
                </div>
              )}
              {medication.renalRisk && (
                <div className="mt-1">
                  <p className="text-sm">
                    <span aria-hidden="true">🩺</span> {medication.renalRisk}
                  </p>
                </div>
              )}
              {index < medications.length - 1 && (
                <div className="w-full h-px bg-white opacity-20 my-2" aria-hidden="true"></div>
              )}
            </div>
          ))}
          <div className="flex justify-end mt-1">
            <button 
              onClick={handleCopy} 
              className="focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
              aria-label="Copy prescription details to clipboard"
            >
              <Copy className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 pt-2 border-t border-white/20">
            <p className="text-xs text-white">
              <strong>Note:</strong> AI responses may not be 100% accurate. Always verify information with healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}