import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const parkingLots = [
  {
    id: 1,
    name: "Bãi đỗ xe Trung Tâm",
    city: "TP.HCM",
    district: "Quận 1",
    type: "vip",
    rating: 4.5,
    price: 10000,
    available: 20,
    address: "123 Đường ABC, Quận 1, TP.HCM",
    image: "https://picsum.photos/400/200?random=1"
  },
  {
    id: 2,
    name: "Bãi đỗ xe Vincom",
    city: "TP.HCM",
    district: "Quận 3",
    type: "normal",
    rating: 4.2,
    price: 12000,
    available: 15,
    address: "45 Đường XYZ, Quận 3, TP.HCM",
    image: "https://picsum.photos/400/200?random=2"
  },
  {
    id: 3,
    name: "Bãi đỗ xe Bệnh viện 115",
    city: "TP.HCM",
    district: "Quận 10",
    type: "normal",
    rating: 3.8,
    price: 8000,
    available: 8,
    address: "678 Lê Lợi, Quận 10, TP.HCM",
    image: "https://picsum.photos/400/200?random=3"
  }
];

const ParkingLotPage = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [district, setDistrict] = useState("all");
  const [type, setType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");

  const filteredLots = parkingLots.filter((lot) => {
    const matchSearch = lot.name.toLowerCase().includes(search.toLowerCase());

    const matchCity = city === "all" || lot.city === city;
    const matchDistrict = district === "all" || lot.district === district;
    const matchType = type === "all" || lot.type === type;

    const matchPrice =
      priceRange === "all" ||
      (priceRange === "low" && lot.price < 10000) ||
      (priceRange === "mid" && lot.price >= 10000 && lot.price <= 12000) ||
      (priceRange === "high" && lot.price > 12000);

    const matchRating =
      rating === "all" ||
      (rating === "4up" && lot.rating >= 4) ||
      (rating === "3up" && lot.rating >= 3);

    return (
      matchSearch &&
      matchCity &&
      matchDistrict &&
      matchType &&
      matchPrice &&
      matchRating
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Danh sách bãi đỗ xe</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm bãi đỗ xe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 col-span-2 md:col-span-2"
        />

        <select value={city} onChange={(e) => setCity(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">Tất cả TP</option>
          <option value="HN">HN</option>
          <option value="TP.HCM">TP.HCM</option>
        </select>

        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">Phường</option>
          <option value="1">Phường 1</option>
          <option value="3">Phường 3</option>
          <option value="10">Phường 10</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">Tất cả loại</option>
          <option value="vip">VIP</option>
          <option value="normal">Thường</option>
        </select>

        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">Giá</option>
          <option value="low">Dưới 10k</option>
          <option value="mid">10k - 12k</option>
          <option value="high">Trên 12k</option>
        </select>

        <select value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">Mọi đánh giá</option>
          <option value="4up">⭐ Từ 4 sao</option>
          <option value="3up">⭐ Từ 3 sao</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLots.map((lot) => (
          <div key={lot.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
            <img src={lot.image} alt={lot.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{lot.name}</h3>
              <p className="text-gray-600">{lot.address}</p>
              <p className="text-sm mt-2">Chỗ trống: <span className="font-medium">{lot.available}</span></p>
              <p className="text-sm">Giá: <span className="font-medium">{lot.price.toLocaleString()} VND/giờ</span></p>
              <p className="text-sm">⭐ {lot.rating}</p>
              <NavLink to="/parking_lots/id">
                <button className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                  Xem chi tiết
                </button>
              </NavLink>
            </div>
          </div>
        ))}
        {filteredLots.length === 0 && <p className="col-span-3 text-center text-gray-500">Không tìm thấy bãi đỗ nào</p>}
      </div>
    </div>
  );
};

export default ParkingLotPage;
