import React, { useState } from "react";
import ChatBox from "@/components/ChatBox";
import { useTheme } from "@/hooks/useTheme";

const AdminChatBox = () => {
  const [owners] = useState([
    { id: 1, name: "Owner A" },
    { id: 2, name: "Owner B" },
    { id: 3, name: "Owner C" },
  ]);
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);
  const [search, setSearch] = useState("");
  const { theme } = useTheme();

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const sidebarClass = theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800";
  const headerClass = theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white";
  const inputClass = `w-full px-3 py-2 rounded-lg border ${
    theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-800"
  } focus:outline-none focus:ring focus:ring-blue-400`;

  const [messages, setMessages] = useState({
    1: [
      { sender: "me", text: "Chào Admin, mình cần hỗ trợ." },
      { sender: "admin", text: "Bạn cần hỗ trợ gì?" },
    ],
    2: [{ sender: "me", text: "Mình muốn nâng cấp gói hội viên." }],
    3: [{ sender: "me", text: "Sân bóng của tôi bị lỗi booking." }],
  });

  const handleSend = (msg) => {
    setMessages({
      ...messages,
      [selectedOwner.id]: [
        ...(messages[selectedOwner.id] || []),
        { sender: "admin", text: msg },
      ],
    });
  };

  const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex h-screen border rounded-lg shadow-lg ${bgClass}`}>
      <div className="flex-1 flex flex-col">
        <div className={`p-4 border-b font-bold ${headerClass}`}>
          Chat với {selectedOwner.name}
        </div>
        <ChatBox
          messages={messages[selectedOwner.id] || []}
          onSend={handleSend}
        />
      </div>

      <div className={`w-1/4 border-l flex flex-col ${sidebarClass}`}>
        <h2 className="p-4 font-bold border-b">Danh sách Owner</h2>
        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Nhập tên owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredOwners.length > 0 ? (
            filteredOwners.map((owner) => (
              <div
                key={owner.id}
                onClick={() => setSelectedOwner(owner)}
                className={`p-3 cursor-pointer ${
                  selectedOwner.id === owner.id
                    ? theme === "dark"
                      ? "bg-gray-700"
                      : "bg-gray-300"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {owner.name}
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500 italic">Không tìm thấy</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatBox;
