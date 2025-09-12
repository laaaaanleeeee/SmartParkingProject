import React, { useEffect, useState } from "react";
import { Table, message, Button, Modal, Form, Input, Popconfirm } from "antd";
import { getAllNews, createNews, updateNews, deleteNews } from "../../services/NewsService";
import { useTheme } from "../../hooks/useTheme";

const ManageNews = () => {
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [form] = Form.useForm();
  const { theme } = useTheme();

  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const tableRowClass = theme === "dark" ? "bg-gray-800 text-green-500" : "bg-white text-gray-800";

  const fetchNews = async (page = 1, size = 10, filters = {}) => {
    try {
      setLoading(true);
      const res = await getAllNews({ page: page - 1, size, ...filters });
      setNewsList(res.data.listDTO);
      setPagination({
        current: res.data.page + 1,
        pageSize: res.data.size,
        total: res.data.totalElement,
      });
    } catch (error) {
      console.error(error);
      message.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(pagination.current, pagination.pageSize);
  }, []);

  const handleAdd = () => {
    setEditingNews(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingNews(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      message.success("Deleted successfully");
      fetchNews(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingNews) {
        await updateNews(editingNews.id, values);
        message.success("Updated successfully");
      } else {
        await createNews(values);
        message.success("Created successfully");
      }
      setIsModalOpen(false);
      fetchNews(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error(error);
      message.error("Failed to save");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "content", key: "content" },
    { title: "Posted At", dataIndex: "postedAt", key: "postedAt" },
    {
      title: "Posted By",
      dataIndex: "postedBy",
      key: "postedBy",
      render: (postedBy) => postedBy?.username,
    },
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
        <h1 className="text-xl font-bold">Manage News</h1>
        <Button type="primary" onClick={handleAdd}>Add News</Button>
      </div>

      <div className="mb-6">
        <Form layout="inline" onFinish={(values) => fetchNews(1, pagination.pageSize, values)} className="mb-4">
          <Form.Item name="title" label="Title">
            <Input placeholder="Search title" />
          </Form.Item>
          <Form.Item name="poster" label="Posted By">
            <Input placeholder="Search poster username" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Search</Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={newsList}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => fetchNews(page, pageSize),
        }}
        className={`${bgClass} ${textClass}`}
        rowClassName={() => tableRowClass}
        bordered
      />

      <Modal
        title={editingNews ? "Edit News" : "Add News"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="postedById" label="Poster ID" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageNews;
