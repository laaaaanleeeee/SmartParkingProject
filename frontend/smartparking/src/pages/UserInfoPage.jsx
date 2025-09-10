import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { User, ShoppingCart, LogOut, Car, CreditCard } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const UserInfoPage = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const textClass1 = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass2 = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const hoverClass =
    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100";

  return (
    <div className={`flex min-h-screen ${bgMain} p-6`}>
      <div className={`w-64 ${bgCard} rounded-xl shadow p-6`}>
        <div
          className={`flex flex-col items-center text-center border-b ${borderClass} pb-6`}
        >
          <div className="w-20 h-20 rounded-full bg-gray-500/20 flex items-center justify-center">
            <User size={40} className={textClass2} />
          </div>
          <h3 className={`mt-3 font-semibold ${textClass1}`}>
            {user?.fullName || "Người dùng"}
          </h3>
        </div>

        <nav className="mt-6 space-y-2">
          <NavLink
            to="info"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${isActive ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
              }`
            }
          >
            <User size={18} /> Thông tin cá nhân
          </NavLink>

          <NavLink
            to="history"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${isActive ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
              }`
            }
          >
            <Car size={18} /> Lịch sử đặt chỗ
          </NavLink>

          <NavLink
            to="vehicles"
            className={({ isActive }) =>
              `flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left ${isActive ? "bg-green-500 text-white" : `${textClass1} ${hoverClass}`
              }`
            }
          >
            <ShoppingCart size={18} /> Xe của tôi
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            <LogOut size={18} /> Đăng xuất
          </button>
        </nav>
      </div>

      <div className={`flex-1 ml-6 ${bgCard} rounded-xl shadow p-6`}>
        <Outlet
          context={{
            textClass1,
            textClass2,
            borderClass,
            inputClass: `w-full px-3 py-2 rounded-lg border ${borderClass} ${textClass1} bg-transparent focus:ring-2 focus:ring-green-500`
          }}
        />
      </div>
    </div>
  );
};

export default UserInfoPage;
