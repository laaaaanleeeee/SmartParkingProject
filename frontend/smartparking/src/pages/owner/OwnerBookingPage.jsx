import React, { useEffect, useState } from "react";
import {
  getMyLotBookings,
  ownerConfirmBooking,
  ownerCompleteBooking,
  ownerCancelBooking,
} from "../../services/BookingService";

const OwnerBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getMyLotBookings({ page, size: 10 });
      setBookings(res.data.listDTO || []);
      setTotalPage(res.data.totalPage || 0);
    } catch (err) {
      console.error("Error fetching bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    await ownerConfirmBooking(id);
    fetchBookings();
  };

  const handleComplete = async (id) => {
    await ownerCompleteBooking(id);
    fetchBookings();
  };

  const handleCancel = async (id) => {
    const reason = prompt("Nhập lý do hủy:");
    if (reason) {
      await ownerCancelBooking(id, reason);
      fetchBookings();
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý booking khách hàng</h1>

      {loading ? (
        <p>Đang tải...</p>
      ) : bookings.length === 0 ? (
        <p>Chưa có booking nào.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Khách hàng</th>
                <th className="p-3 border">Bãi đỗ</th>
                <th className="p-3 border">Slot</th>
                <th className="p-3 border">Trạng thái</th>
                <th className="p-3 border">Thời gian</th>
                <th className="p-3 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="text-center">
                  <td className="p-2 border">{b.userName}</td>
                  <td className="p-2 border">{b.parkingLotName}</td>
                  <td className="p-2 border">{b.slotName}</td>
                  <td className="p-2 border">{b.bookingStatus}</td>
                  <td className="p-2 border">
                    {b.startTime} - {b.endTime}
                  </td>
                  <td className="p-2 border space-x-2">
                    {b.bookingStatus === "PENDING" && (
                      <button
                        onClick={() => handleConfirm(b.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Xác nhận
                      </button>
                    )}
                    {b.bookingStatus === "CONFIRMED" && (
                      <button
                        onClick={() => handleComplete(b.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Hoàn thành
                      </button>
                    )}
                    {b.bookingStatus !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-center gap-2">
        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              i === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OwnerBookingPage;
