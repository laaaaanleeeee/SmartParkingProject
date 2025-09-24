import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
} from "antd";
import {
  getAllBookings,
  adminCreateBooking,
  adminUpdateBooking,
  adminDeleteBooking,
} from "@/services/BookingService";
import { useTheme } from "@/hooks/useTheme";

const { Option } = Select;

const ManageBooking = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const { theme } = useTheme();

  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  const tableRowClass =
    theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
  const modalBgClass = theme === "dark" ? "bg-gray-900" : "bg-white";

  const fetchBookings = async (page = 1, size = 10, filters = {}) => {
    try {
      setLoading(true);
      const res = await getAllBookings({ page: page - 1, size, ...filters });
      setBookings(res.data.listDTO);
      setPagination({
        current: res.data.page + 1,
        pageSize: res.data.size,
        total: res.data.totalElement,
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(pagination.current, pagination.pageSize);
  }, []);

  const handleAdd = () => {
    setEditingBooking(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingBooking(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await adminDeleteBooking(id);
      message.success("Deleted successfully");
      fetchBookings(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingBooking) {
        await adminUpdateBooking(editingBooking.id, values);
        message.success("Updated successfully");
      } else {
        await adminCreateBooking(values);
        message.success("Created successfully");
      }
      setIsModalOpen(false);
      fetchBookings(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to save");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "userName", key: "userName" },
    { title: "Parking Lot", dataIndex: "parkingLotName", key: "parkingLotName" },
    { title: "Slot", dataIndex: "slotName", key: "slotName" },
    { title: "License Plate", dataIndex: "licensePlate", key: "licensePlate" },
    { title: "Status", dataIndex: "bookingStatus", key: "bookingStatus" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Start", dataIndex: "startTime", key: "startTime" },
    { title: "End", dataIndex: "endTime", key: "endTime" },
    { title: "Created", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure delete this?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className={`p-6 rounded-lg shadow ${bgClass} ${textClass} min-h-screen`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Booking
        </Button>
      </div>

      <div className="mb-6">
        <Form
          form={searchForm}
          layout="inline"
          className="flex flex-wrap gap-4"
          onFinish={(values) => fetchBookings(1, pagination.pageSize, values)}
        >
          <Form.Item
            name="username"
            label={
              <span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                Username
              </span>
            }
          >
            <Input placeholder="Search username" allowClear />
          </Form.Item>
          <Form.Item
            name="status"
            label={
              <span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                Status
              </span>
            }
          >
            <Select allowClear style={{ width: 150 }}>
              <Option value="PENDING">PENDING</Option>
              <Option value="CONFIRMED">CONFIRMED</Option>
              <Option value="CANCELLED">CANCELLED</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="lotId"
            label={
              <span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                Lot ID
              </span>
            }
          >
            <Input placeholder="Search lot id" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        bordered
        loading={loading}
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchBookings(page, pageSize),
        }}
        className={`${bgClass} ${textClass}`}
        rowClassName={() => tableRowClass}
      />

      <Modal
        title={editingBooking ? "Edit Booking" : "Add Booking"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        className={modalBgClass}
      >
        <Form form={form} layout="vertical" className={textClass}>
          <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="parkingLotId" label="Parking Lot ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="parkingSlotId" label="Slot ID">
            <Input />
          </Form.Item>
          <Form.Item name="vehicleId" label="Vehicle ID">
            <Input />
          </Form.Item>
          <Form.Item name="bookingStatus" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="PENDING">PENDING</Option>
              <Option value="CONFIRMED">CONFIRMED</Option>
              <Option value="CANCELLED">CANCELLED</Option>
            </Select>
          </Form.Item>
          <Form.Item name="startTime" label="Start Time" rules={[{ required: true }]}>
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item name="endTime" label="End Time" rules={[{ required: true }]}>
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item name="totalPrice" label="Total Price">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="cancellationReason" label="Cancellation Reason">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBooking;
