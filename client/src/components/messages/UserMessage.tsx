interface UserMessageProps {
  content: string;
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-white rounded-lg py-2 px-4 max-w-[80%] border border-gray-200">
        <p className="text-sm text-black">{content}</p>
      </div>
    </div>
  );
}