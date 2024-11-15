// Sidebar.tsx
import React from "react";
import { User, Zap, ShoppingCart } from "lucide-react";

type Friend = {
  name: string;
  status: "offline" | "idle" | "online";
};

const friends: Friend[] = [
  { name: "waffles", status: "offline" },
  { name: "luna", status: "offline" },
  { name: "dog", status: "offline" },
  { name: "cat", status: "idle" },
  { name: "turtle", status: "offline" },
  { name: "monkey", status: "offline" },
];

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white p-4 h-screen">
      <div className="flex items-center bg-gray-700 rounded-md p-2 mb-4">
        <input
          type="text"
          placeholder="Find or start a conversation"
          className="bg-transparent text-gray-300 w-full px-2 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <button className="flex items-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600">
          <User name="user" className="mr-2" />
          <span>Friends</span>
        </button>
        <button className="flex items-center px-4 py-2 rounded-md hover:bg-gray-600">
          <Zap className="mr-2" />
          <span>Nitro</span>
        </button>
        <button className="flex items-center px-4 py-2 rounded-md hover:bg-gray-600">
          <ShoppingCart className="mr-2" />
          <span>Shop</span>
        </button>
      </div>

      <div className="mt-4 mb-2 text-gray-400 text-sm">DIRECT MESSAGES</div>
      <div className="space-y-2">
        {friends.map((friend, index) => (
          <button
            key={index}
            className="flex items-center px-4 py-2 rounded-md hover:bg-gray-600"
          >
            <User name="user" className="mr-2" />{" "}
            {/* Replace with appropriate avatars if needed */}
            <span>{friend.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 mb-2 text-gray-400 text-sm">
        ALL FRIENDS — {friends.length}
      </div>
      <div className="overflow-y-auto space-y-2">
        {friends.map((friend, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 rounded-md hover:bg-gray-600"
          >
            <div
              className={`w-2 h-2 mr-2 rounded-full ${getStatusColor(
                friend.status
              )}`}
            />
            <span>{friend.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define a function to get status color based on the friend's status
const getStatusColor = (status: Friend["status"]): string => {
  switch (status) {
    case "offline":
      return "bg-gray-500";
    case "idle":
      return "bg-yellow-500";
    case "online":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default Sidebar;
