import ReactMarkdown from 'react-markdown';

interface AIMessageProps {
  content: string;
}

export default function AIMessage({ content }: AIMessageProps) {
  return (
    <div className="flex mb-2">
      <div className="bg-[#2A7E78] text-white rounded-lg py-2 px-4 max-w-[80%] shadow-sm">
        <div className="text-sm prose prose-invert prose-sm max-w-none text-white">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
          {content.includes("Unable to read prescription") || content.length === 0 ? null : (
            <div className="mt-2 text-xs border-t border-white/20 pt-2">
              Note: AI responses may not be 100% accurate. Always verify information with healthcare professionals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}