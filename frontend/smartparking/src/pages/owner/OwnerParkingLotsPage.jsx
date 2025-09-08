import React, { useEffect, useState } from "react";
import {
  getMyParkingLots,
  createMyParkingLot,
  updateMyParkingLot,
  deleteMyParkingLot,
} from "../../services/ParkingLotService";

const OwnerParkingLotsPage = () => {
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
      pricePerHour: lot.pricePerHour,
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bãi đỗ của tôi</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          + Thêm bãi đỗ
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : lots.length === 0 ? (
        <p>Chưa có bãi đỗ nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lots.map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{lot.name}</h2>
              <p className="text-gray-600">{lot.address}</p>
              <p className="text-gray-500 text-sm">
                {lot.city} - {lot.ward}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Slots:</span>{" "}
                {lot.availableSlots}/{lot.totalSlots}
              </p>
              <p className="mt-1 text-sm">
                <span className="font-medium">Giá/giờ:</span>{" "}
                {lot.pricePerHour} VND
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEditModal(lot)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(lot.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2">
        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded-lg ${
              i === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingLot ? "Cập nhật bãi đỗ" : "Thêm bãi đỗ mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tên bãi đỗ"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Thành phố"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="text"
                placeholder="Phường/Xã"
                value={formData.ward}
                onChange={(e) =>
                  setFormData({ ...formData, ward: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="number"
                placeholder="Tổng số chỗ"
                value={formData.totalSlots}
                onChange={(e) =>
                  setFormData({ ...formData, totalSlots: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <input
                type="number"
                placeholder="Giá/giờ (VND)"
                value={formData.pricePerHour}
                onChange={(e) =>
                  setFormData({ ...formData, pricePerHour: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
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
