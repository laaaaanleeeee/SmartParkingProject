import React, { useState, useEffect } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { Empty, Tag, Pagination } from "antd";
import { useTheme } from "@/hooks/useTheme";

const OwnerNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderCard = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const mockNotifications = [
    {
      id: 1,
      title: "Cập nhật hệ thống",
      message: "Hệ thống sẽ bảo trì vào ngày mai lúc 2:00 AM.",
      type: "INFO",
      read: false,
      createdAt: "2025-09-18 10:30",
    },
    {
      id: 2,
      title: "Doanh thu tháng 9",
      message: "Bạn đã đạt doanh thu trên 50 triệu VNĐ. Xin chúc mừng!",
      type: "SUCCESS",
      read: true,
      createdAt: "2025-09-15 09:00",
    },
    {
      id: 3,
      title: "Cảnh báo thanh toán",
      message: "Một số giao dịch bị hủy do lỗi kết nối ngân hàng.",
      type: "WARNING",
      read: false,
      createdAt: "2025-09-12 15:45",
    },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setTotal(mockNotifications.length);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "INFO":
        return <Info className="text-blue-500" />;
      case "WARNING":
        return <AlertTriangle className="text-yellow-500" />;
      case "SUCCESS":
        return <CheckCircle2 className="text-green-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className={`p-6 min-h-screen ${bgMain} transition-colors`}>
      <h1 className={`text-2xl font-bold mb-4 ${textPrimary}`}>
        Thông báo từ Admin
      </h1>

      {notifications.length === 0 ? (
        <Empty description="Không có thông báo nào" />
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-4 rounded-xl shadow border ${bgCard} ${borderCard}`}
            >
              <div className="p-2 bg-gray-200/20 rounded-full">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${textPrimary}`}>{n.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{n.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Tag color={n.read ? "default" : "blue"}>
                    {n.read ? "Đã đọc" : "Chưa đọc"}
                  </Tag>
                  <span className="text-xs text-gray-400">{n.createdAt}</span>
                </div>
              </div>
              {!n.read && (
                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Đánh dấu đã đọc
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Pagination
          current={page}
          pageSize={6}
          total={total}
          onChange={(p) => setPage(p)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default OwnerNotificationPage;
