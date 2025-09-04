import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { User, MapPin, ShoppingCart, LogOut, Car } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

import PersonalInfo from "../components/PersonalInfo";
import Membership from "../components/Membership";
import BookingHistory from "../components/BookingHistory";
import MyVehicles from "../components/MyVehicles";

const UserInfoPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("info");
  const { theme } = useTheme();

  const textClass1 = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass2 = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverClass = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100";
  const inputClass = `w-full px-3 py-2 rounded-lg border ${borderClass} ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`;

  return (
    <div className={`flex min-h-screen ${bgMain} p-6`}>
      <div className={`w-64 ${bgCard} rounded-xl shadow p-6`}>
        <div className={`flex flex-col items-center text-center border-b ${borderClass} pb-6`}>
          <div className="w-20 h-20 rounded-full bg-gray-500/20 flex items-center justify-center">
            <User size={40} className={textClass2} />
          </div>
          <h3 className={`mt-3 font-semibold ${textClass1}`}>
            {user?.fullName || "Người dùng"}
          </h3>
        </div>

        <nav className="mt-6 space-y-2">
          <button onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "info" ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
            }`}>
            <User size={18} /> Thông tin cá nhân
          </button>
          {/* <button onClick={() => setActiveTab("membership")}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "membership" ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
            }`}>
            <MapPin size={18} /> Gói hội viên
          </button> */}
          <button onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "history" ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
            }`}>
            <Car size={18} /> Lịch sử đặt chỗ
          </button>
          <button onClick={() => setActiveTab("vehicles")}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${
              activeTab === "vehicles" ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
            }`}>
            <ShoppingCart size={18} /> Xe của tôi
          </button>
          <button onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30">
            <LogOut size={18} /> Đăng xuất
          </button>
        </nav>
      </div>

      <div className={`flex-1 ml-6 ${bgCard} rounded-xl shadow p-6`}>
        {activeTab === "info" && (
  <PersonalInfo
    inputClass={inputClass}
    textClass1={textClass1}
    textClass2={textClass2}
  />
)}
{activeTab === "membership" && <Membership textClass1={textClass1} />}
{activeTab === "history" && <BookingHistory textClass1={textClass1} />}
{activeTab === "vehicles" && <MyVehicles textClass1={textClass1} />}

      </div>
    </div>
  );
};

export default UserInfoPage;
