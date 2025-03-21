import ReactMarkdown from 'react-markdown';

interface AIMessageProps {
  content: string;
}

export default function AIMessage({ content }: AIMessageProps) {
  return (
    <div className="flex mb-2">
      <div className="bg-primary text-white rounded-lg py-2 px-4 max-w-[80%]">
        <div className="text-sm prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
