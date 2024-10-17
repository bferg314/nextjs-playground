"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PlusCircle,
  Hash,
  Mic,
  Headphones,
  Settings,
  Smile,
  Paperclip,
  Gift,
} from "lucide-react";

export default function DiscordClone() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
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
  ]);

  const servers = [
    { id: 1, name: "Anthropic", icon: "A" },
    { id: 2, name: "React Devs", icon: "R" },
    { id: 3, name: "AI Enthusiasts", icon: "AI" },
  ];

  const channels = [
    { id: 1, name: "general" },
    { id: 2, name: "random" },
    { id: 3, name: "off-topic" },
    { id: 4, name: "announcements" },
  ];

  const [activeChannel, setActiveChannel] = useState(channels[0]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    const scrollArea = document.querySelector(".scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-800 text-gray-100">
        {/* Server List */}
        <div className="w-18 bg-gray-900 p-3 flex flex-col items-center space-y-4">
          {servers.map((server) => (
            <Tooltip key={server.id}>
              <TooltipTrigger>
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  {server.icon}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{server.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger>
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors">
                <PlusCircle size={24} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add a Server</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Channel List */}
        <div className="w-60 bg-gray-800 p-3">
          <h2 className="text-lg font-semibold mb-4">Channels</h2>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded ${
                activeChannel.id === channel.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveChannel(channel)}
            >
              <Hash size={20} />
              <span>{channel.name}</span>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-700 p-4 shadow">
            <h2 className="text-lg font-semibold">#{activeChannel.name}</h2>
          </div>
          <ScrollArea className="flex-1 p-4 scroll-area">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                <div className="flex items-start">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${msg.user}`}
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
              <Button size="icon" variant="ghost">
                <PlusCircle size={20} />
              </Button>
              <Input
                type="text"
                placeholder={`Message #${activeChannel.name}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-gray-600 border-none focus:ring-2 focus:ring-blue-500"
              />
              <Button size="icon" variant="ghost">
                <Gift size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Paperclip size={20} />
              </Button>
              <Button size="icon" variant="ghost">
                <Smile size={20} />
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
                src="https://api.dicebear.com/6.x/initials/svg?seed=You"
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
    </TooltipProvider>
  );
}
