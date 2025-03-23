import ReactMarkdown from 'react-markdown';

interface AIMessageProps {
  content: string;
}

export default function AIMessage({ content }: AIMessageProps) {
  return (
    <div className="flex mb-2">
      <div 
        className="bg-[#1A7F77] text-white rounded-lg py-2 px-5 max-w-[80%] shadow-sm"
        role="region"
        aria-label="AI response"
      > 
        <div className="text-sm prose prose-invert prose-sm max-w-none text-white">
          <ReactMarkdown components={{
            // Make sure headers have proper hierarchy
            h1: ({ node, ...props }) => <h3 className="text-lg font-bold" {...props} />,
            h2: ({ node, ...props }) => <h4 className="text-md font-semibold" {...props} />,
            h3: ({ node, ...props }) => <h5 className="text-sm font-semibold" {...props} />,
            // Add proper roles and captions for tables if they exist
            table: ({ node, ...props }) => <div className="overflow-x-auto"><table className="border-collapse border border-white/20" role="table" {...props} /></div>,
            // Ensure links open in new tabs and have proper accessibility attributes
            a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80" {...props} />
          }}>
            {content}
          </ReactMarkdown>
          {content.includes("Unable to read prescription") || content.length === 0 ? null : (
            <div className="mt-2 text-xs border-t border-white/20 pt-2" aria-live="polite">
              <strong>Note:</strong> AI responses may not be 100% accurate. Always verify information with healthcare professionals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}