import React, { useEffect, useState } from "react";
import {
  getMyLotBookings,
  ownerConfirmBooking,
  ownerCompleteBooking,
  ownerCancelBooking,
} from "@/services/BookingService";
import {
  CalendarCheck,
  CalendarClock,
  CalendarX2,
  CalendarDays,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const OwnerBookingPage = () => {
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderCard = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const bgTableHeader = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const bgTable = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderTable = theme === "dark" ? "border-gray-700" : "border-gray-200";

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

  const total = bookings.length;
  const pending = bookings.filter((b) => b.bookingStatus === "PENDING").length;
  const confirmed = bookings.filter((b) => b.bookingStatus === "CONFIRMED").length;
  const cancelled = bookings.filter((b) => b.bookingStatus === "CANCELLED").length;

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400 font-medium">Đang chờ</span>;
      case "CONFIRMED":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 font-medium">Đã xác nhận</span>;
      case "COMPLETED":
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 font-medium">Hoàn thành</span>;
      case "CANCELLED":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 font-medium">Đã hủy</span>;
      default:
        return status;
    }
  };

  return (
    <div className={`p-6 space-y-8 min-h-screen ${bgMain}`}>
      <h1 className={`text-2xl font-bold ${textPrimary}`}>Quản lý booking khách hàng</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`shadow rounded-xl p-4 flex items-center gap-3 ${bgCard} border ${borderCard}`}>
          <CalendarDays className="text-blue-500" size={28} />
          <div>
            <p className={textSecondary}>Tổng booking</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>{total}</p>
          </div>
        </div>
        <div className={`shadow rounded-xl p-4 flex items-center gap-3 ${bgCard} border ${borderCard}`}>
          <CalendarClock className="text-yellow-500" size={28} />
          <div>
            <p className={textSecondary}>Đang chờ</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>{pending}</p>
          </div>
        </div>
        <div className={`shadow rounded-xl p-4 flex items-center gap-3 ${bgCard} border ${borderCard}`}>
          <CalendarCheck className="text-green-500" size={28} />
          <div>
            <p className={textSecondary}>Đã xác nhận</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>{confirmed}</p>
          </div>
        </div>
        <div className={`shadow rounded-xl p-4 flex items-center gap-3 ${bgCard} border ${borderCard}`}>
          <CalendarX2 className="text-red-500" size={28} />
          <div>
            <p className={textSecondary}>Đã hủy</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>{cancelled}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className={textSecondary}>Đang tải...</p>
      ) : bookings.length === 0 ? (
        <p className={textSecondary}>Chưa có booking nào.</p>
      ) : (
        <div className={`overflow-x-auto rounded-xl shadow border ${borderCard}`}>
          <table className={`w-full border-collapse text-sm ${bgTable}`}>
            <thead className={bgTableHeader}>
              <tr className={textPrimary}>
                <th className={`p-3 text-left border ${borderTable}`}>Khách hàng</th>
                <th className={`p-3 text-left border ${borderTable}`}>Bãi đỗ</th>
                <th className={`p-3 text-left border ${borderTable}`}>Slot</th>
                <th className={`p-3 text-center border ${borderTable}`}>Trạng thái</th>
                <th className={`p-3 text-center border ${borderTable}`}>Thời gian</th>
                <th className={`p-3 text-center border ${borderTable}`}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className={`transition-colors ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                  <td className={`p-3 border ${borderTable} text-left ${textSecondary}`}>{b.userName}</td>
                  <td className={`p-3 border ${borderTable} text-left ${textSecondary}`}>{b.parkingLotName}</td>
                  <td className={`p-3 border ${borderTable} ${textSecondary}`}>{b.slotName}</td>
                  <td className={`p-3 border ${borderTable}`}>{renderStatus(b.bookingStatus)}</td>
                  <td className={`p-3 border ${borderTable} ${textSecondary}`}>
                    {b.startTime} - {b.endTime}
                  </td>
                  <td className={`p-3 border ${borderTable} space-x-2`}>
                    {b.bookingStatus === "PENDING" && (
                      <button
                        onClick={() => handleConfirm(b.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs"
                      >
                        Xác nhận
                      </button>
                    )}
                    {b.bookingStatus === "CONFIRMED" && (
                      <button
                        onClick={() => handleComplete(b.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs"
                      >
                        Hoàn thành
                      </button>
                    )}
                    {b.bookingStatus !== "CANCELLED" && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
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

      {totalPage > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(totalPage)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 rounded ${
                i === page
                  ? "bg-blue-500 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerBookingPage;
