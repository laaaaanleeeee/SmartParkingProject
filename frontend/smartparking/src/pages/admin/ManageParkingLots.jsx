import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input, Select, Popconfirm } from "antd";
import {
  getAllParkingLot,
  createParkingLot,
  updateParkingLot,
  deleteParkingLot,
} from "../../services/ParkingLotService";

const { Option } = Select;

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

  const fetchParkingLots = async (page = 1, size = 10) => {
    try {
      setLoading(true);
      const res = await getAllParkingLot({ page: page - 1, size });
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
      await deleteParkingLot(id);
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
        await updateParkingLot(editingLot.id, values);
        message.success("Updated successfully");
      } else {
        await createParkingLot(values);
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
    { title: "Total Slots", dataIndex: "totalSlots", key: "totalSlots" },
    { title: "Available Slots", dataIndex: "availableSlots", key: "availableSlots" },
    { title: "Status", dataIndex: "parkingLotStatus", key: "status" },
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Parking Lots</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Parking Lot
        </Button>
      </div>
      <Table
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
      />

      <Modal
        title={editingLot ? "Edit Parking Lot" : "Add Parking Lot"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ward" label="Ward" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="totalSlots" label="Total Slots" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="availableSlots"
            label="Available Slots"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="parkingLotStatus" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageParkingLots;
