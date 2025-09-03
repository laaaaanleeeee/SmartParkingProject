import React, { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../services/BookingService";
import { message, Table, Button, Tag } from "antd";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchBookings(pagination.current, pagination.pageSize);
  }, []);

  const fetchBookings = async (page, size) => {
    try {
      setLoading(true);
      const res = await getMyBookings({
        page: page - 1,
        size,
        sort: "createdAt,desc",
      });

      setBookings(res.data.listDTO || []);
      setPagination({
        current: res.data.page + 1,
        pageSize: res.data.size,
        total: res.data.totalElement,
      });
    } catch {
      message.error("Không thể lấy lịch sử đặt chỗ");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id, "Người dùng hủy đặt chỗ");
      message.success("Hủy đặt chỗ thành công");
      fetchBookings(pagination.current, pagination.pageSize);
    } catch {
      message.error("Không thể hủy đặt chỗ");
    }
  };

  const statusColors = {
    PENDING: "gold",
    CONFIRMED: "blue",
    COMPLETED: "green",
    CANCELLED: "red",
  };

  const columns = [
    {
      title: "Mã đặt chỗ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Bãi đỗ xe",
      dataIndex: ["parkingLot", "name"],
      key: "parkingLot",
    },
    {
      title: "Vị trí slot",
      dataIndex: ["slot", "slotCode"],
      key: "slot",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (val) => new Date(val).toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) =>
        record.status === "PENDING" ? (
          <Button danger onClick={() => handleCancel(record.id)}>
            Hủy
          </Button>
        ) : null,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lịch sử đặt chỗ</h2>
      </div>

      <Table
        rowKey="id"
        dataSource={bookings}
        loading={loading}
        columns={columns}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => fetchBookings(page, pageSize),
        }}
      />
    </div>
  );
};

export default BookingHistory;
