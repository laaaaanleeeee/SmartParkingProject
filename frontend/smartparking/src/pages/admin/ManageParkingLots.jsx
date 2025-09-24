import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
} from "antd";
import {
  adminGetAllParkingLots,
  adminCreateParkingLot,
  adminUpdateParkingLot,
  adminDeleteParkingLot,
} from "@/services/ParkingLotService";
import { useTheme } from "@/hooks/useTheme";

const ManageParkingLots = () => {
  const [loading, setLoading] = useState(false);
  const [parkingLots, setParkingLots] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLot, setEditingLot] = useState(null);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const { theme } = useTheme();

  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const bgClass = theme === "dark" ? "bg-black" : "bg-white";
  const tableRowClass =
    theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800";
  const modalBgClass = theme === "dark" ? "bg-gray-900" : "bg-white";

  const fetchParkingLots = async (page = 1, size = 10, filters = {}) => {
    try {
      setLoading(true);
      const res = await adminGetAllParkingLots({
        page: page - 1,
        size,
        ...filters,
      });
      setParkingLots(res.data.listDTO);
      setPagination({
        current: res.data.page + 1,
        pageSize: res.data.size,
        total: res.data.totalElement,
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to load parking lots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingLots(pagination.current, pagination.pageSize);
  }, []);

  const handleAdd = () => {
    setEditingLot(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingLot(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await adminDeleteParkingLot(id);
      message.success("Deleted successfully");
      fetchParkingLots(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingLot) {
        await adminUpdateParkingLot(editingLot.id, values);
        message.success("Updated successfully");
      } else {
        await adminCreateParkingLot(values);
        message.success("Created successfully");
      }
      setIsModalOpen(false);
      fetchParkingLots(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to save");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "Ward", dataIndex: "ward", key: "ward" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Slots", dataIndex: "slots", key: "slots" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
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
        <h1 className="text-2xl font-bold">Manage Parking Lots</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Parking Lot
        </Button>
      </div>

      <div className="mb-6">
        <Form
          form={searchForm}
          layout="inline"
          className="flex flex-wrap gap-4"
          onFinish={(values) =>
            fetchParkingLots(1, pagination.pageSize, values)
          }
        >
          <Form.Item name="name" label={<span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>Name</span>}>
            <Input placeholder="Search name" allowClear />
          </Form.Item>
          <Form.Item name="city" label={<span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>City</span>}>
            <Input placeholder="Search city" allowClear />
          </Form.Item>
          <Form.Item name="ward" label={<span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>Ward</span>}>
            <Input placeholder="Search ward" allowClear />
          </Form.Item>
          <Form.Item name="minPrice" label={<span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>Min Price</span>}>
            <InputNumber style={{ width: 120 }} />
          </Form.Item>
          <Form.Item name="maxPrice" label={<span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>Max Price</span>}>
            <InputNumber style={{ width: 120 }} />
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
        dataSource={parkingLots}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchParkingLots(page, pageSize),
        }}
        className={`${bgClass} ${textClass}`}
        rowClassName={() => tableRowClass}
      />

      <Modal
        title={editingLot ? "Edit Parking Lot" : "Add Parking Lot"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        className={modalBgClass}
      >
        <Form form={form} layout="vertical" className={textClass}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ward" label="Ward" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="slots" label="Slots" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="rating" label="Rating">
            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageParkingLots;
