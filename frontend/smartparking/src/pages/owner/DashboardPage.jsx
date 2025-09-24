import React from "react";
import { BarChart2, Building2, CalendarDays, DollarSign } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const DashboardPage = () => {
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderCard = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const recentBookings = [
    { id: 1, customer: "Nguyen Van A", slot: "A1", status: "Confirmed" },
    { id: 2, customer: "Tran Thi B", slot: "B2", status: "Pending" },
    { id: 3, customer: "Le Van C", slot: "C3", status: "Cancelled" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`p-6 space-y-6 min-h-screen ${bgMain} transition-colors`}>
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>
          Owner Dashboard
        </h1>
        <p className={`mt-1 ${textSecondary}`}>Tổng quan tình hình bãi đỗ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm ${bgCard} ${borderCard}`}>
          <Building2 size={28} className={textPrimary} />
          <div>
            <p className={textSecondary}>Parking Lots</p>
            <p className={`text-xl font-bold ${textPrimary}`}>3</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm ${bgCard} ${borderCard}`}>
          <CalendarDays size={28} className={textPrimary} />
          <div>
            <p className={textSecondary}>Bookings Today</p>
            <p className={`text-xl font-bold ${textPrimary}`}>12</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm ${bgCard} ${borderCard}`}>
          <DollarSign size={28} className={textPrimary} />
          <div>
            <p className={textSecondary}>Revenue (Month)</p>
            <p className={`text-xl font-bold ${textPrimary}`}>15,000,000đ</p>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-sm ${bgCard} ${borderCard}`}>
          <BarChart2 size={28} className={textPrimary} />
          <div>
            <p className={textSecondary}>Upcoming Bookings</p>
            <p className={`text-xl font-bold ${textPrimary}`}>8</p>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border shadow-sm ${bgCard} ${borderCard}`}>
        <h2 className={`mb-4 text-lg font-semibold ${textPrimary}`}>
          Recent Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={theme === "dark" ? "bg-gray-800" : "bg-gray-200"}>
                <th className={`p-3 text-left font-semibold ${textPrimary}`}>Customer</th>
                <th className={`p-3 text-left font-semibold ${textPrimary}`}>Slot</th>
                <th className={`p-3 text-left font-semibold ${textPrimary}`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
                >
                  <td className={`p-3 ${textSecondary}`}>{booking.customer}</td>
                  <td className={`p-3 ${textSecondary}`}>{booking.slot}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm font-medium ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
