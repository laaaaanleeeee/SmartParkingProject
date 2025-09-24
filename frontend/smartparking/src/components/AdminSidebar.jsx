import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  CreditCard,
  BarChart2,
  LogOut,
  Sun,
  Moon
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

const menuItems = [
  { to: "/admin/manage_parking_lots", label: "Parking Lots", icon: <LayoutDashboard size={20} /> },
  { to: "/admin/manage_users", label: "Users", icon: <Users size={20} /> },
  { to: "/admin/manage_bookings", label: "Bookings", icon: <Building2 size={20} /> },
  { to: "/admin/manage_news", label: "News", icon: <CalendarDays size={20} /> },
  { to: "/admin/manage_sensors", label: "Sensors", icon: <CreditCard size={20} /> },
  { to: "/admin/admin_chatbox", label: "Chat", icon: <BarChart2 size={20} /> },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">Management</h2>
      <nav className="flex flex-col gap-4 flex-grow">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors mb-2"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </button>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
