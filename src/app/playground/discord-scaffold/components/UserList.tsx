// components/UserList.tsx
export default function UserList() {
  return (
    <div className="p-4 text-white">
      <h2 className="mb-2 text-lg font-bold">Online</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-gray-300">User1</li>
        <li className="cursor-pointer hover:text-gray-300">User2</li>
        <li className="cursor-pointer hover:text-gray-300">User3</li>
      </ul>
    </div>
  );
}
