import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { confirmBooking, cancelBooking, getBookingById } from "../services/BookingService";
import { Card, Typography, Button, message } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(state?.booking || null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!booking) {
        const res = await getBookingById(id);
        setBooking(res.data);
      }
    };
    fetchBooking();
  }, [id, booking]);

  useEffect(() => {
    if (!booking?.expireAt) return;
    const expireAt = moment(booking.expireAt);
    const timer = setInterval(() => {
      const diff = expireAt.diff(moment(), "seconds");
      setTimeLeft(diff);
      if (diff <= 0) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [booking]);

  const handleConfirm = async () => {
    try {
      await confirmBooking(id);
      message.success("Thanh toán thành công!");
      navigate("/history_booking");
    } catch (err) {
        console.error(err);
      message.error("Thanh toán thất bại");
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(id, "User cancel payment");
      message.success("Bạn đã hủy đơn đặt chỗ");
      navigate("/history_booking");
    } catch (err) {
        console.error(err);
      message.error("Hủy đơn thất bại");
    }
  };

  if (!booking) return <p>Đang tải...</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <Title level={3}>Thanh toán đặt chỗ</Title>
        <Text strong>Bãi đỗ:</Text> {booking.parkingLotId} <br />
        <Text strong>Xe:</Text> {booking.vehicleId} <br />
        <Text strong>Chỗ:</Text> {booking.parkingSlotId} <br />
        <Text strong>Thời gian:</Text> {booking.startTime} → {booking.endTime} <br />
        <Text strong>Tổng tiền:</Text> {booking.totalPrice} VND <br />
        <Text strong>Phương thức:</Text> {state?.method || "N/A"} <br />
        <Text type="danger">
          Thời gian còn lại: {timeLeft > 0 ? `${timeLeft}s` : "Hết hạn"}
        </Text>

        <div className="mt-4 flex gap-2">
          <Button type="primary" onClick={handleConfirm}>Xác nhận thanh toán</Button>
          <Button danger onClick={handleCancel}>Huỷ thanh toán</Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentPage;
