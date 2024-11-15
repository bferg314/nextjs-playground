// components/ChannelList.tsx
export default function ChannelList() {
  return (
    <div className="p-4 text-white">
      <h2 className="mb-2 text-lg font-bold">Channels</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-gray-300"># general</li>
        <li className="cursor-pointer hover:text-gray-300"># memes</li>
        <li className="cursor-pointer hover:text-gray-300"># tech-talk</li>
      </ul>
    </div>
  );
}
