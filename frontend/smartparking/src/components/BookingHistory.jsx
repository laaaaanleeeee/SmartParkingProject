import React, { useEffect, useState } from "react";
import { getMyBookings, cancelBooking, completeBooking } from "../services/BookingService";
import { message, Button, Tag, Spin, Pagination, Card } from "antd";
import { useTheme } from "../hooks/useTheme";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const BookingHistory = () => {
  const { theme } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-700";
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";

  useEffect(() => {
    fetchBookings(pagination.current, pagination.pageSize);
  }, []);

  const fetchBookings = async (page, size) => {
    try {
      setLoading(true);
      const res = await getMyBookings({
        page: page - 1,
        size,
        sort: "createdAt,desc",
      });
      setBookings(res.data.listDTO || []);
      setPagination({
        current: res.data.page + 1,
        pageSize: res.data.size,
        total: res.data.totalElement,
      });
    } catch {
      message.error("Không thể lấy lịch sử đặt chỗ");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id, "Người dùng hủy đặt chỗ");
      message.success("Hủy đặt chỗ thành công");
      fetchBookings(pagination.current, pagination.pageSize);
    } catch {
      message.error("Không thể hủy đặt chỗ");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeBooking(id);
      message.success("Xác nhận hoàn tất thành công");
      fetchBookings(pagination.current, pagination.pageSize);
    } catch {
      message.error("Không thể xác nhận hoàn tất");
    }
  };

  const statusColors = {
    PENDING: "gold",
    CONFIRMED: "blue",
    COMPLETED: "green",
    CANCELLED: "red",
  };

  return (
    <div className={`${bgClass}`}>
      <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>
        Lịch sử đặt chỗ
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          Bạn chưa có lịch sử đặt chỗ nào
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id}>
              <Card
                className="shadow-md rounded-xl border hover:shadow-lg transition-all"
                title={
                  <span className="flex items-center gap-2 font-semibold">
                    <span className={textClass}>{booking.parkingLotName}</span>
                  </span>
                }
                extra={
                  <Tag
                    color={statusColors[booking.bookingStatus]}
                    className="font-medium px-3 py-1 rounded"
                  >
                    {booking.bookingStatus}
                  </Tag>
                }
                style={{
                  backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
                  color: theme === "dark" ? "#e5e7eb" : "#374151",
                }}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${textClass}`}
                >
                  <p>
                    <NumberOutlined className="mr-2 text-blue-500" />
                    <strong>Mã đặt chỗ:</strong> {booking.id}
                  </p>
                  <p>
                    <CalendarOutlined className="mr-2 text-green-500" />
                    <strong>Slot:</strong> {booking.slotName}
                  </p>
                  <p>
                    <ClockCircleOutlined className="mr-2 text-purple-500" />
                    <strong>Bắt đầu:</strong>{" "}
                    {new Date(booking.startTime).toLocaleString()}
                  </p>
                  <p>
                    <ClockCircleOutlined className="mr-2 text-orange-500" />
                    <strong>Kết thúc:</strong>{" "}
                    {new Date(booking.endTime).toLocaleString()}
                  </p>
                  <p>
                    <EnvironmentOutlined className="mr-2 text-green-500" />
                    <strong>Địa chỉ:</strong> {booking.address}
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  {booking.bookingStatus === "PENDING" && (
                    <Button
                      danger
                      onClick={() => handleCancel(booking.id)}
                      className="px-5"
                    >
                      Hủy đặt chỗ
                    </Button>
                  )}

                  {booking.bookingStatus === "CONFIRMED" && (
                    <Button
                      type="primary"
                      onClick={() => handleComplete(booking.id)}
                      className="px-5 bg-green-600"
                    >
                      Xác nhận hoàn tất
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          ))}

          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(page, size) => fetchBookings(page, size)}
            className="mt-6 text-center"
          />
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
