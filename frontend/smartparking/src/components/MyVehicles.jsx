import React, { useEffect, useState } from "react";
import {
  getMyVehicles,
  deleteVehicle,
  createVehicle,
  updateVehicle,
} from "@/services/VehicleService";
import { message, Button, Drawer, Form, Input, Select, Card } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { useTheme } from "@/hooks/useTheme";

const { Option } = Select;

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [form] = Form.useForm();
  const { theme } = useTheme();

  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const cardClass =
    theme === "dark"
      ? "bg-gray-800 text-green-400 shadow-lg"
      : "bg-white text-gray-800 shadow-md";

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getMyVehicles();
      setVehicles(res.data);
    } catch {
      message.error("Không thể lấy danh sách xe");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      message.success("Xoá xe thành công");
      fetchVehicles();
    } catch {
      message.error("Xoá xe thất bại");
    }
  };

  const openDrawerForCreate = () => {
    setEditingVehicle(null);
    form.resetFields();
    setOpen(true);
  };

  const openDrawerForEdit = (record) => {
    setEditingVehicle(record);
    form.setFieldsValue(record);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, values);
        message.success("Cập nhật xe thành công");
      } else {
        await createVehicle(values);
        message.success("Thêm xe thành công");
      }
      setOpen(false);
      fetchVehicles();
    } catch {
      message.error("Thao tác thất bại");
    }
  };

  return (
    <div className={`${bgClass}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${textClass}`}>
          Danh sách xe của tôi
        </h2>
        <Button type="primary" onClick={openDrawerForCreate}>
          Thêm xe mới
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            loading={loading}
            className={`${cardClass} rounded-xl hover:shadow-xl transition`}
            title={
              <span className={`flex items-center gap-2 font-semibold ${textClass}`}>
                <CarOutlined /> {vehicle.licensePlate}
              </span>
            }
            extra={
              <div className="space-x-2">
                <Button size="small" onClick={() => openDrawerForEdit(vehicle)}>
                  Sửa
                </Button>
                <Button
                  size="small"
                  danger
                  onClick={() => handleDelete(vehicle.id)}
                >
                  Xoá
                </Button>
              </div>
            }
            style={{
              backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
              color: theme === "dark" ? "#e5e7eb" : "#374151",
            }}
          >
            <p>
              <b>Loại xe:</b>{" "}
              {vehicle.vehicleType === "CAR" ? "Ô tô" : "Xe máy"}
            </p>
            <p>
              <b>Hãng:</b> {vehicle.brand}
            </p>
            <p>
              <b>Mẫu xe:</b> {vehicle.model}
            </p>
            <p>
              <b>Màu:</b> {vehicle.color}
            </p>
            <p>
              <b>Năm SX:</b> {vehicle.manufactureYear}
            </p>
          </Card>
        ))}
      </div>

      <Drawer
        title={
          <span className={textClass}>
            {editingVehicle ? "Cập nhật xe" : "Thêm xe mới"}
          </span>
        }
        onClose={() => setOpen(false)}
        open={open}
        width={400}
        className={bgClass}
        extra={
          <div>
            <Button onClick={() => setOpen(false)} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </div>
        }
        style={{
          backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
          color: theme === "dark" ? "#e5e7eb" : "#374151",
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="licensePlate"
            label={<span className={textClass}>Biển số</span>}
            rules={[{ required: true, message: "Nhập biển số" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vehicleType"
            label={<span className={textClass}>Loại xe</span>}
            rules={[{ required: true, message: "Chọn loại xe" }]}
          >
            <Select>
              <Option value="CAR">Ô tô</Option>
              <Option value="MOTORBIKE">Xe máy</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="brand"
            label={<span className={textClass}>Hãng</span>}
            rules={[{ required: true, message: "Nhập hãng xe" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label={<span className={textClass}>Mẫu xe</span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label={<span className={textClass}>Màu</span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="manufactureYear"
            label={<span className={textClass}>Năm sản xuất</span>}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default MyVehicles;
