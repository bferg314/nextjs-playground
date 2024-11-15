// components/ChatArea.tsx
export default function ChatArea() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 text-white">
        {/* Example chat messages */}
        <div>
          <span className="font-bold text-green-400">User1:</span> Hello, world!
        </div>
        <div>
          <span className="font-bold text-blue-400">User2:</span> Hey there!
        </div>
      </div>
      <div className="p-4 bg-gray-800">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded bg-gray-700 text-white outline-none"
        />
      </div>
    </div>
  );
}
