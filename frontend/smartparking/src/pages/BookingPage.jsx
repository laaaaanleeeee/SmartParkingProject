import React, { useState } from "react";

const BookingPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    licensePlate: "",
    vehicleType: "car",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Info:", form);
    alert("Đặt chỗ thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Đặt chỗ bãi đỗ xe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Họ tên</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Biển số xe
            </label>
            <input
              type="text"
              name="licensePlate"
              value={form.licensePlate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Loại xe
            </label>
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="car">Ô tô</option>
              <option value="motorbike">Xe máy</option>
              <option value="bicycle">Xe đạp</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Ngày</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Giờ</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Xác nhận đặt chỗ
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
