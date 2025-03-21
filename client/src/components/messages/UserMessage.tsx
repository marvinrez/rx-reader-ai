interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-xs">
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}
