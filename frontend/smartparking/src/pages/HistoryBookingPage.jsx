import React from "react";

const HistoryBookingPage = () => {
  // dữ liệu mẫu
  const historyData = [
    {
      id: 1,
      parkingLot: "Bãi đỗ xe A",
      date: "2025-08-15",
      time: "08:00 - 10:00",
      price: "50.000đ",
      status: "Hoàn tất",
    },
    {
      id: 2,
      parkingLot: "Bãi đỗ xe B",
      date: "2025-08-16",
      time: "14:00 - 16:00",
      price: "70.000đ",
      status: "Đã hủy",
    },
    {
      id: 3,
      parkingLot: "Bãi đỗ xe C",
      date: "2025-08-18",
      time: "09:00 - 11:00",
      price: "60.000đ",
      status: "Đang chờ",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt chỗ</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Bãi đỗ xe</th>
              <th className="px-4 py-2 text-left">Ngày</th>
              <th className="px-4 py-2 text-left">Thời gian</th>
              <th className="px-4 py-2 text-left">Giá</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{item.parkingLot}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2">{item.time}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    item.status === "Hoàn tất"
                      ? "text-green-600"
                      : item.status === "Đã hủy"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryBookingPage;
