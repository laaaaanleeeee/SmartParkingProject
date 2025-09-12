import React, { useState } from "react";
import ChatBox from "../../components/ChatBox";

const OwnerChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Chào bạn, cần hỗ trợ gì không?" },
    { sender: "me", text: "Mình muốn hỏi về gói hội viên Pro." },
  ]);

  const handleSend = (msg) => {
    setMessages([...messages, { sender: "me", text: msg }]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] mt-10 border rounded-xl shadow-lg flex flex-col">
      <div className="p-4 border-b bg-blue-500 text-white font-bold text-lg rounded-t-xl">
        Chat với Admin
      </div>
      <ChatBox messages={messages} onSend={handleSend} />
    </div>
  );
};

export default OwnerChatBox;
