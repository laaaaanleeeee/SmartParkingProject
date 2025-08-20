import React, { useState } from 'react';

const UserInfoPage = () => {
  const [user, setUser] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    licensePlate: "30A-12345",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Thông tin đã được lưu!");
    // chỗ này bạn có thể gọi API PUT/POST để lưu thông tin
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Thông tin người dùng</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Biển số xe</label>
          <input
            type="text"
            name="licensePlate"
            value={user.licensePlate}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Lưu
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfoPage;
