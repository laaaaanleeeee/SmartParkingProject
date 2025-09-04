import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input, Select, Popconfirm } from "antd";
import { getAllUsers, createUser, deleteUser, updateUser } from "../../services/UserService";

const { Option } = Select;

const ManageUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async (page = 1, size = 10, filters = {}) => {
    try {
      setLoading(true);
      const res = await getAllUsers({ page: page - 1, size, ...filters });
      setUsers(res.data.listDTO);
      setPagination({
        current: res.data.page + 1,
        pageSize: res.data.size,
        total: res.data.totalElement,
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize);
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Deleted successfully");
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success("Updated successfully");
      } else {
        await createUser(values);
        message.success("Created successfully");
      }
      setIsModalOpen(false);
      fetchUsers(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to save");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Role", dataIndex: "userRole", key: "role" },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Are you sure delete this?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Users</h1>
        <Button type="primary" onClick={handleAdd}>Add User</Button>
      </div>
      <Form layout="inline" onFinish={(values) => fetchUsers(1, pagination.pageSize, values)}>
        <Form.Item name="username" label="Username">
          <Input placeholder="Search username" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Search email" />
        </Form.Item>
        <Form.Item name="fullName" label="Full Name">
          <Input placeholder="Search full name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Search</Button>
        </Form.Item>
      </Form>

      <Table
        loading={loading}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchUsers(page, pageSize),
        }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="userRole" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="ADMIN">ADMIN</Option>
              <Option value="CLIENT">CLIENT</Option>
              <Option value="OWNER">OWNER</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
