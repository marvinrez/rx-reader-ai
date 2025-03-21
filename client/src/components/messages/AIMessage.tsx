interface AIMessageProps {
  content: string;
}

export default function AIMessage({ content }: AIMessageProps) {
  return (
    <div className="flex mb-2">
      <div className="bg-primary text-white rounded-lg py-2 px-4 max-w-xs">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}
