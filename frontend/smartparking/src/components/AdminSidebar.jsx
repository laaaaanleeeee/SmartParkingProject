import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  CreditCard,
  BarChart2,
  Settings,
} from "lucide-react";

const menuItems = [
  { to: "/admin/manage-parking-lots", label: "Parking Lots", icon: <LayoutDashboard size={20} /> },
  { to: "/admin/manage-users", label: "Users", icon: <Users size={20} /> },
  { to: "/admin/manage-bookings", label: "Bookings", icon: <Building2 size={20} /> },
  { to: "/admin/manage-news", label: "News", icon: <CalendarDays size={20} /> },
  { to: "/admin/manage-sensors", label: "Sensors", icon: <CreditCard size={20} /> },
  { to: "/admin/chat", label: "Chat", icon: <BarChart2 size={20} /> },
  { to: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
];

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">Management</h2>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
