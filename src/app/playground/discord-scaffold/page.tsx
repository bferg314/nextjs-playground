// page.tsx
import ServerList from "./components/ServerList";
import ChannelList from "./components/ChannelList";
import ChatArea from "./components/ChatArea";
import UserList from "./components/UserList";

export default function HomePage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar: Server List */}
      <aside className="w-16 bg-gray-900">
        <ServerList />
      </aside>

      {/* Sidebar: Channel List */}
      <aside className="w-64 bg-gray-800">
        <ChannelList />
      </aside>

      {/* Main content: Chat Area */}
      <main className="flex-1 bg-gray-700">
        <ChatArea />
      </main>

      {/* Sidebar: User List */}
      <aside className="w-64 bg-gray-800">
        <UserList />
      </aside>
    </div>
  );
}
