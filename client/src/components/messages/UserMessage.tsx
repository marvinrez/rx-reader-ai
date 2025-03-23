interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-2">
      <div 
        className="bg-white rounded-lg py-2 px-4 max-w-[80%] border border-gray-200 shadow-sm"
        role="region"
        aria-label="Your message"
      >
        <p className="text-sm text-gray-900">{content}</p>
      </div>
    </div>
  );
}