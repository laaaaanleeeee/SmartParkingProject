import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getParkingLotDetail } from "../services/ParkingLotService";
import { useTheme } from "../hooks/useTheme";
import { Carousel } from "antd";
import {
  MapPin,
  DollarSign,
  Star,
  ArrowRight,
  Car,
} from "lucide-react";
import { FloatButton } from 'antd';

const ParkingLotDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [parkingLot, setParkingLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textClass1 = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass2 = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-200";

  useEffect(() => {
    const fetchParkingLot = async () => {
      try {
        const res = await getParkingLotDetail(id);
        setParkingLot(res.data);
      } catch {
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchParkingLot();
  }, [id]);

  if (loading) return <div className={`p-10 text-center ${textClass2}`}>Đang tải...</div>;
  if (error) return <div className={`p-10 text-center text-red-500`}>{error}</div>;
  if (!parkingLot) return <div className={`p-10 text-center ${textClass2}`}>Không tìm thấy bãi đỗ</div>;

  const mapSrc = `https://www.google.com/maps?q=${parkingLot.latitude},${parkingLot.longitude}&hl=vi&z=16&output=embed`;

  return (
    <div className={`min-h-screen ${bgMain} p-6`}>
      {parkingLot.images?.length > 0 && (
        <div className={`${bgCard} rounded-xl shadow mb-6 overflow-hidden`}>
          <Carousel autoplay dots className="w-full h-80">
            {parkingLot.images.map((img) => (
              <div key={img.id} className="w-full h-80">
                <img
                  src={img.url}
                  alt="Parking lot"
                  className="w-full h-80 object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-2 ${bgCard} rounded-xl shadow p-6`}>
          <h2 className={`text-2xl font-semibold mb-4 ${textClass1}`}>
            {parkingLot.name}
          </h2>

          <div className={`space-y-3 ${textClass2}`}>
            <p><MapPin className="inline w-5 h-5 mr-2 text-green-500" /> 
              {parkingLot.address}, {parkingLot.ward}, {parkingLot.city}
            </p>
            <p>
              <Car className="inline w-5 h-5 mr-2 text-green-500" /> 
              Số chỗ: 
              <span className="ml-2 text-green-500 font-semibold">{parkingLot.availableSlots}</span> / {parkingLot.totalSlots}
            </p>
            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
              <span className={`px-2 py-1 rounded text-sm font-semibold ${
                parkingLot.parkingLotStatus === "ACTIVE" ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}>
                {parkingLot.parkingLotStatus}
              </span>
            </p>
            <p><span className="font-medium">Mô tả:</span> {parkingLot.description}</p>
          </div>

          <div className="mt-6">
            <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${textClass1}`}>
              <DollarSign className="w-5 h-5 text-green-500" /> Giá theo giờ
            </h3>
            <ul className={`space-y-2 border rounded-lg p-4 ${borderClass}`}>
              {parkingLot.pricings.map((item) => (
                <li key={item.id} className={`${textClass2}`}>
                  <b>{item.vehicleType}</b>: {item.pricePerHour} VNĐ/giờ
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${textClass1}`}>
              <Star className="w-5 h-5 text-green-500" /> Đánh giá
            </h3>
            <ul className={`space-y-2 border rounded-lg p-4 ${borderClass}`}>
              {parkingLot.reviews?.length > 0 ? (
                parkingLot.reviews.map((review) => (
                  <li key={review.id} className={`${textClass2}`}>
                    ⭐ {review.rating} — "{review.comment}" – <i>{review.user.fullName}</i>
                  </li>
                ))
              ) : (
                <p className={textClass2}>Chưa có đánh giá nào</p>
              )}
            </ul>
          </div>
        </div>

        <div className={`${bgCard} rounded-xl shadow p-6`}>
          <h3 className={`text-lg font-semibold mb-3 ${textClass1}`}>Bản đồ</h3>
          <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
            <iframe
              src={mapSrc}
              title="Bản đồ"
              width="100%"
              height="100%"
              allowFullScreen
            ></iframe>
          </div>

          <button
            onClick={() =>
              navigate(`/parking_lots/${parkingLot.id}/booking`, {
                state: { parkingLot },
              })
            }
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <ArrowRight className="w-5 h-5" /> Đặt chỗ ngay
          </button>
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default ParkingLotDetailPage;
