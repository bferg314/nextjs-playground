"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircle,
  Hash,
  Mic,
  Headphones,
  Settings,
  Send,
} from "lucide-react";

export default function DiscordClone() {
  const [message, setMessage] = useState("");

  const servers = [
    { id: 1, name: "Server 1", icon: "S1" },
    { id: 2, name: "Server 2", icon: "S2" },
    { id: 3, name: "Server 3", icon: "S3" },
  ];

  const channels = [
    { id: 1, name: "general" },
    { id: 2, name: "random" },
    { id: 3, name: "off-topic" },
  ];

  const messages = [
    {
      id: 1,
      user: "User 1",
      content: "Hello, Discord!",
      timestamp: "Today at 1:30 PM",
    },
    {
      id: 2,
      user: "User 2",
      content: "Hey there!",
      timestamp: "Today at 1:31 PM",
    },
    {
      id: 3,
      user: "User 3",
      content: "What's everyone up to?",
      timestamp: "Today at 1:32 PM",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-800 text-gray-100">
      {/* Server List */}
      <div className="w-18 bg-gray-900 p-3 flex flex-col items-center space-y-4">
        {servers.map((server) => (
          <div
            key={server.id}
            className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {server.icon}
          </div>
        ))}
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors">
          <PlusCircle size={24} />
        </div>
      </div>

      {/* Channel List */}
      <div className="w-60 bg-gray-800 p-3">
        <h2 className="text-lg font-semibold mb-4">Channels</h2>
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
          >
            <Hash size={20} />
            <span>{channel.name}</span>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-700 p-4 shadow">
          <h2 className="text-lg font-semibold"># general</h2>
        </div>
        <ScrollArea className="flex-1 p-4">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4">
              <div className="flex items-start">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={msg.user}
                  />
                  <AvatarFallback>{msg.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-baseline">
                    <span className="font-semibold mr-2">{msg.user}</span>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 bg-gray-700">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Message #general"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-600 border-none focus:ring-2 focus:ring-blue-500"
            />
            <Button size="icon" variant="ghost">
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="w-60 bg-gray-800 p-3 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-4">Online - 3</h2>
          {["User 1", "User 2", "User 3"].map((user, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>{user}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center bg-gray-900 p-2 rounded">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Your Avatar"
            />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">Your Username</div>
            <div className="text-xs text-gray-400">#1234</div>
          </div>
          <div className="flex space-x-1">
            <Button size="icon" variant="ghost">
              <Mic size={18} />
            </Button>
            <Button size="icon" variant="ghost">
              <Headphones size={18} />
            </Button>
            <Button size="icon" variant="ghost">
              <Settings size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
