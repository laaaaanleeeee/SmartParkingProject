import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const DetectVehiclesPage = () => {
  const [vehicles] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/240x160.png?text=Car+1",
      plate: "30A-12345",
      time: "2025-09-09 10:23",
      status: "IN",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/240x160.png?text=Car+2",
      plate: "29B-67890",
      time: "2025-09-09 10:30",
      status: "OUT",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const bgTableHead = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const borderCard = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const filteredVehicles = vehicles.filter((v) =>
    v.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 space-y-6 min-h-screen ${bgMain} transition-colors`}>
      <div>
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Vehicle Detection</h1>
        <p className={textSecondary}>Theo dõi xe vào/ra bằng nhận diện biển số</p>
      </div>

      <div className={`shadow rounded-2xl p-4 ${bgCard} ${borderCard}`}>
        <h2 className={`text-lg font-semibold mb-3 ${textPrimary}`}>
          Camera Live Feed
        </h2>
        <div className="h-64 bg-gray-500/20 flex items-center justify-center rounded-lg">
          <span className={textSecondary}>[ Video Stream Placeholder ]</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Start Camera
          </button>
          <button className={`px-4 py-2 rounded-lg shadow ${bgMain} ${textPrimary}`}>
            Upload Image
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className={`text-lg font-semibold ${textPrimary}`}>
          Danh sách xe đã detect
        </h2>
        <input
          type="text"
          placeholder="Tìm theo biển số..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className={`shadow rounded-2xl overflow-x-auto ${bgCard} ${borderCard}`}>
        <table className="w-full text-sm text-left border rounded-lg">
          <thead className={`${bgTableHead} ${textSecondary}`}>
            <tr>
              <th className="px-3 py-2 border">Image</th>
              <th className="px-3 py-2 border">Plate</th>
              <th className="px-3 py-2 border">Time</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((v) => (
              <tr
                key={v.id}
                className="hover:bg-gray-500/10 transition cursor-pointer"
              >
                <td className="px-3 py-2 border">
                  <img
                    src={v.image}
                    alt="vehicle"
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className={`px-3 py-2 border font-semibold ${textPrimary}`}>
                  {v.plate}
                </td>
                <td className={`px-3 py-2 border ${textSecondary}`}>{v.time}</td>
                <td className="px-3 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      v.status === "IN"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>
                <td className="px-3 py-2 border">
                  <button
                    onClick={() => setSelected(v)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
            {filteredVehicles.length === 0 && (
              <tr>
                <td colSpan="5" className={`text-center py-4 ${textSecondary}`}>
                  Không tìm thấy xe
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-2xl shadow-lg w-96 p-6 relative ${bgCard} ${borderCard}`}>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <h2 className={`text-xl font-bold mb-4 ${textPrimary}`}>
              Chi tiết xe
            </h2>
            <img
              src={selected.image}
              alt="vehicle"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className={textSecondary}>
              <span className={`font-semibold ${textPrimary}`}>Biển số: </span>
              {selected.plate}
            </p>
            <p className={textSecondary}>
              <span className={`font-semibold ${textPrimary}`}>Thời gian: </span>
              {selected.time}
            </p>
            <p className={textSecondary}>
              <span className={`font-semibold ${textPrimary}`}>Trạng thái: </span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  selected.status === "IN"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {selected.status}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectVehiclesPage;
