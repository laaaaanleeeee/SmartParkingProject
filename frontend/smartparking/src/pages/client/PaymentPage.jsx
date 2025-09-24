import React, { useEffect, useState } from "react";
import { Button, message, Typography, Card } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getBookingById, confirmBooking, cancelBooking } from "@/services/BookingService";
import { refundPayment, getPaymentByBooking } from "@/services/PaymentService";
import moment from "moment";

const { Title, Text } = Typography;

const PaymentPage = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const [payment, setPayment] = useState(location.state?.payment || null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const fetchBookingAndPayment = async () => {
      try {
        if (!booking) {
          const resBooking = await getBookingById(bookingId);
          setBooking(resBooking.data);
        }
        if (!payment) {
          const resPayment = await getPaymentByBooking(bookingId);
          setPayment(resPayment.data);
        }

        if (booking?.expireAt) {
          const expire = moment(booking.expireAt);
          const now = moment();
          const diff = expire.diff(now, "seconds");
          setTimeLeft(diff > 0 ? diff : 0);
        }
      } catch {
        message.error("Không thể lấy thông tin thanh toán");
      }
    };

    fetchBookingAndPayment();
  }, [bookingId, booking, payment]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      await confirmBooking(bookingId);
      message.success("Thanh toán thành công!");
      navigate("/history_booking");
    } catch {
      message.error("Thanh toán thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(bookingId, "Người dùng hủy");
      if (payment?.id) {
        await refundPayment(payment.id);
      }
      message.success("Hủy đặt chỗ & hoàn tiền thành công!");
      navigate("/my-bookings");
    } catch {
      message.error("Hủy đặt chỗ thất bại");
    }
  };

  if (!booking) return <p>Đang tải thông tin...</p>;

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <Title level={3} className="text-center">
          Thanh toán đặt chỗ
        </Title>

        <div className="mt-4 space-y-2">
          <Text strong>Bãi đỗ: </Text> {booking.parkingLot?.name} <br />
          <Text strong>Xe: </Text> {booking.vehicle?.licensePlate} <br />
          <Text strong>Chỗ: </Text> {booking.parkingSlot?.slotNumber} <br />
          <Text strong>Bắt đầu: </Text>{" "}
          {moment(booking.startTime).format("DD/MM/YYYY HH:mm")} <br />
          <Text strong>Kết thúc: </Text>{" "}
          {moment(booking.endTime).format("DD/MM/YYYY HH:mm")} <br />
          <Text strong>Trạng thái đặt chỗ: </Text> {booking.bookingStatus} <br />
          <Text strong>Trạng thái thanh toán: </Text> {payment?.status || "PENDING"} <br />
          <Text strong>Hết hạn thanh toán sau: </Text>{" "}
          {`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
        </div>

        <div className="flex justify-between mt-6">
          <Button type="primary" loading={loading} onClick={handlePayment}>
            Thanh toán
          </Button>
          <Button danger onClick={handleCancel}>
            Hủy & Hoàn tiền
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentPage;
