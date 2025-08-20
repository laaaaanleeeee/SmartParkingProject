import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Card, Rate } from "antd";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { getParkingLotDetail } from "../services/ParkingLotService";
import ImgBg1 from "../assets/parkinglotimg.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";


const ParkingLotDetailPage = () => {
  const { id } = useParams();
  const [parkingLot, setParkingLot] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchParkingLot = async () => {
      try {
        const res = await getParkingLotDetail(id);
        setParkingLot(res.data);
      } catch (err) {
        console.error("Lỗi fetch chi tiết bãi đỗ: ", err);
        message.error("Không thể tải chi tiết bãi đỗ!");
      }
    };
    fetchParkingLot();
  }, [id]);

  if (!parkingLot) {
    return <div className="text-center">Đang tải...</div>;
  }

  const getAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

  const getMinPrice = (pricings) => {
    if (pricings.length === 0) return "Chưa có giá";
    return Math.min(...pricings.map((p) => p.pricePerHour)).toLocaleString("vi-VN") + " VNĐ/giờ";
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">{parkingLot.name}</h2>
      <Card
        cover={
          <img
            alt={parkingLot.name}
            src={parkingLot.images.length > 0 ? parkingLot.images[0].url : ImgBg1}
            className="h-64 object-cover"
          />
        }
      >
        <div className="p-4">
          <p className="text-sm"><strong>Địa chỉ:</strong> {parkingLot.address}</p>
          <div className="text-sm mt-2">
            <span><strong>Đánh giá:</strong> </span>
            <Rate disabled allowHalf value={getAverageRating(parkingLot.reviews)} />
            <span> ({parkingLot.reviews.length} đánh giá)</span>
          </div>
          <p className="text-sm"><strong>Giá:</strong> {getMinPrice(parkingLot.pricings)}</p>
          <p className="text-sm"><strong>Số chỗ:</strong> {parkingLot.availableSlots}/{parkingLot.totalSlots}</p>
          <p className="text-sm"><strong>Mô tả:</strong> {parkingLot.description}</p>
          <p className="text-sm"><strong>Trạng thái:</strong> {parkingLot.parkingLotStatus}</p>
          <p className="text-sm"><strong>Chủ sở hữu:</strong> {parkingLot.owner.fullName} ({parkingLot.owner.username})</p>
          <p className="text-sm">
            <strong>Ngày tạo:</strong>{" "}
            {format(new Date(parkingLot.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
          </p>
          <Button
            type="primary"
            className="mt-4"
            onClick={() => navigate(`/parking-lots/${parkingLot.id}/booking`)}
          >
            Đặt chỗ
          </Button>
        </div>
        {parkingLot.reviews.length > 0 && (
          <div className="p-4">
            <h3 className="text-lg font-semibold">Đánh giá</h3>
            {parkingLot.reviews.map((review) => (
              <div key={review.id} className="mt-2">
                <p>
                  <strong>{review.user.fullName}</strong> ({review.rating} sao): {review.comment}
                </p>
                <p className="text-xs">
                  {format(new Date(review.createdAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ParkingLotDetailPage;