import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const PersonalInfo = ({ inputClass, textClass1, textClass2 }) => {
  const { user, updateUser } = useAuth();
  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    userGender: "",
    dob: "",
  });

  useEffect(() => {
    if (user) {
      setFormUser({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        userGender: user.userGender || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser(formUser);
      alert("Cập nhật thành công!");
    } catch (err) {
      console.error("Lỗi update user:", err);
    }
  };

  return (
    <div>
      <h2 className={`text-xl font-bold mb-4 ${textClass1}`}>Thông tin cá nhân</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-1 ${textClass2}`}>Họ tên</label>
          <input
            type="text"
            name="fullName"
            value={formUser.fullName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${textClass2}`}>Giới tính</label>
          <select
            name="userGender"
            value={formUser.userGender}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Chọn giới tính</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
            <option value="OTHER">Khác</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${textClass2}`}>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formUser.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${textClass2}`}>Ngày sinh</label>
          <input
            type="date"
            name="dob"
            value={formUser.dob}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="col-span-2">
          <label className={`block text-sm font-medium mb-1 ${textClass2}`}>Email</label>
          <input
            type="email"
            name="email"
            value={formUser.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Lưu thông tin
      </button>
    </div>
  );
};

export default PersonalInfo;
