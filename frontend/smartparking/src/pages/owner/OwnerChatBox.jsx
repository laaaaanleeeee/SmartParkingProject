import React, { useState } from "react";
import { SendHorizonal, MessageCircle } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const OwnerChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Chào bạn, cần hỗ trợ gì không?" },
    { sender: "me", text: "Mình muốn hỏi về gói hội viên Pro." },
  ]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "me", text: input }]);
    setInput("");
  };

  return (
    <div className={`max-w-full h-screen flex flex-col ${bgMain} transition-colors`}>
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-lg flex items-center justify-between">
        <MessageCircle />
        <span>Chat với Admin</span>
        <span className="text-sm opacity-80">Online</span>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${bgCard}`}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl shadow ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : `${bgMain} ${textPrimary} rounded-bl-none`
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className={`p-3 border-t flex items-center gap-2 ${bgCard}`}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default OwnerChatBox;
