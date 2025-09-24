import React, { useEffect, useState } from "react";
import {
  getMyParkingLots,
  createMyParkingLot,
  updateMyParkingLot,
  deleteMyParkingLot,
} from "@/services/ParkingLotService";
import { Plus, MapPin, Car, DollarSign } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const OwnerParkingLotsPage = () => {
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderCard = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLot, setEditingLot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    ward: "",
    totalSlots: 0,
    pricePerHour: 0,
  });

  const fetchLots = async () => {
    setLoading(true);
    try {
      const res = await getMyParkingLots({ page, size: 6 });
      setLots(res.data.listDTO || []);
      setTotalPage(res.data.totalPage || 0);
    } catch (error) {
      console.error("Error fetching lots", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLots();
  }, [page]);

  const openCreateModal = () => {
    setEditingLot(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      ward: "",
      totalSlots: 0,
      pricePerHour: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (lot) => {
    setEditingLot(lot);
    setFormData({
      name: lot.name,
      address: lot.address,
      city: lot.city,
      ward: lot.ward,
      totalSlots: lot.totalSlots,
      pricePerHour:
        lot.pricings && lot.pricings.length > 0
          ? lot.pricings[0].pricePerHour
          : 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLot) {
        await updateMyParkingLot(editingLot.id, formData);
      } else {
        await createMyParkingLot(formData);
      }
      setIsModalOpen(false);
      fetchLots();
    } catch (err) {
      console.error("Error saving lot", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bãi đỗ này?")) {
      await deleteMyParkingLot(id);
      fetchLots();
    }
  };

  const totalSlots = lots.reduce((sum, lot) => sum + lot.totalSlots, 0);
  const availableSlots = lots.reduce(
    (sum, lot) => sum + (lot.availableSlots || 0),
    0
  );

  const avgPrice =
    lots.length > 0
      ? Math.round(
          lots.reduce((sum, l) => {
            if (!l.pricings || l.pricings.length === 0) return sum;
            const avgLot =
              l.pricings.reduce((s, p) => s + p.pricePerHour, 0) /
              l.pricings.length;
            return sum + avgLot;
          }, 0) / lots.length
        )
      : 0;

  return (
    <div className={`p-6 space-y-8 min-h-screen ${bgMain} transition-colors`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Quản lý bãi đỗ</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={18} /> Thêm bãi đỗ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`p-4 rounded-xl border shadow flex items-center gap-3 ${bgCard} ${borderCard}`}
        >
          <MapPin className="text-blue-500" size={28} />
          <div>
            <p className={`${textSecondary} text-sm`}>Tổng số bãi</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>
              {lots.length}
            </p>
          </div>
        </div>
        <div
          className={`p-4 rounded-xl border shadow flex items-center gap-3 ${bgCard} ${borderCard}`}
        >
          <Car className="text-green-500" size={28} />
          <div>
            <p className={`${textSecondary} text-sm`}>Số chỗ trống</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>
              {availableSlots}/{totalSlots}
            </p>
          </div>
        </div>
        <div
          className={`p-4 rounded-xl border shadow flex items-center gap-3 ${bgCard} ${borderCard}`}
        >
          <DollarSign className="text-yellow-500" size={28} />
          <div>
            <p className={`${textSecondary} text-sm`}>Giá TB / giờ</p>
            <p className={`text-xl font-semibold ${textPrimary}`}>
              {avgPrice} VND
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className={textSecondary}>Đang tải...</p>
      ) : lots.length === 0 ? (
        <p className={textSecondary}>Chưa có bãi đỗ nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lots.map((lot) => (
            <div
              key={lot.id}
              className={`rounded-xl shadow p-5 border flex flex-col justify-between ${bgCard} ${borderCard}`}
            >
              <div>
                <h2 className={`text-lg font-semibold ${textPrimary}`}>
                  {lot.name}
                </h2>
                <p className={`${textSecondary} text-sm`}>{lot.address}</p>
                <p className={`${textSecondary} text-sm`}>
                  {lot.city} - {lot.ward}
                </p>
                <div className="mt-3 text-sm space-y-1">
                  <p>
                    <span className="font-medium">Slots:</span>{" "}
                    {lot.availableSlots}/{lot.totalSlots}
                  </p>

                  <div>
                    <span className="font-medium">Giá/giờ:</span>
                    <div className="ml-2 mt-1 space-y-0.5">
                      {lot.pricings && lot.pricings.length > 0 ? (
                        lot.pricings.map((p) => (
                          <p
                            key={p.id}
                            className={`${textSecondary} flex justify-between`}
                          >
                            <span>{p.vehicleType}</span>
                            <span className={textPrimary}>
                              {p.pricePerHour} VND
                            </span>
                          </p>
                        ))
                      ) : (
                        <span className={textSecondary}>Chưa có giá</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEditModal(lot)}
                  className="flex-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(lot.id)}
                  className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPage > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(totalPage)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 rounded-lg ${
                i === page
                  ? "bg-blue-500 text-white"
                  : `${bgCard} ${borderCard} ${textSecondary} hover:opacity-80`
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div
            className={`rounded-xl shadow-lg p-6 w-full max-w-md ${bgCard} ${borderCard}`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${textPrimary}`}>
              {editingLot ? "Cập nhật bãi đỗ" : "Thêm bãi đỗ mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {["name", "address", "city", "ward"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={
                    field === "name"
                      ? "Tên bãi đỗ"
                      : field === "address"
                      ? "Địa chỉ"
                      : field === "city"
                      ? "Thành phố"
                      : "Phường/Xã"
                  }
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className={`w-full border rounded-lg p-2 ${bgMain} ${textPrimary} ${borderCard}`}
                  required
                />
              ))}
              <input
                type="number"
                placeholder="Tổng số chỗ"
                value={formData.totalSlots}
                onChange={(e) =>
                  setFormData({ ...formData, totalSlots: e.target.value })
                }
                className={`w-full border rounded-lg p-2 ${bgMain} ${textPrimary} ${borderCard}`}
                required
              />
              <input
                type="number"
                placeholder="Giá/giờ mặc định (VND)"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerHour: e.target.value })
                }
                className={`w-full border rounded-lg p-2 ${bgMain} ${textPrimary} ${borderCard}`}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded-lg ${bgMain} ${textSecondary} ${borderCard} hover:opacity-80`}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  {editingLot ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerParkingLotsPage;
