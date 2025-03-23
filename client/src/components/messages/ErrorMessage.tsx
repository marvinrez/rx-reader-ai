import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  errorType?: string;
}

export default function ErrorMessage({ message, errorType = 'general' }: ErrorMessageProps) {
  return (
    <div className="flex items-start rounded-lg bg-red-50 p-4 mb-4 max-w-[85%] ml-auto mr-4 border border-red-200">
      <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="text-sm font-medium text-red-800">
          {errorType === 'api' 
            ? 'Service Temporarily Unavailable' 
            : errorType === 'format' 
              ? 'Image Format Issue'
              : errorType === 'size'
                ? 'Image Size Too Large'
                : 'Error Processing Request'
          }
        </h3>
        <div className="mt-1 text-sm text-red-700">
          {message}
        </div>
        <div className="mt-2 text-xs text-red-600">
          {errorType === 'format' && (
            <p>Recommendation: Try using a clearer image in JPG or PNG format.</p>
          )}
          {errorType === 'size' && (
            <p>Recommendation: Try using a smaller image or reduce image quality.</p>
          )}
          {errorType === 'api' && (
            <p>Please try again in a few minutes.</p>
          )}
        </div>
      </div>
    </div>
  );
}