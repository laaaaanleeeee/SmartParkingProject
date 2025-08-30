import React, { useEffect, useState } from "react";
import { getMyVehicles, deleteVehicle, createVehicle, updateVehicle } from "../services/VehicleService";
import { message, Table, Button, Drawer, Form, Input, Select } from "antd";

const { Option } = Select;

const VehiclesInfo = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [form] = Form.useForm();

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
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Danh sách xe của tôi</h2>
                <Button type="primary" onClick={openDrawerForCreate}>
                    Thêm xe mới
                </Button>
            </div>

            <Table
                rowKey="id"
                dataSource={vehicles}
                loading={loading}
                columns={[
                    { title: "Biển số", dataIndex: "licensePlate" },
                    { title: "Loại xe", dataIndex: "vehicleType" },
                    { title: "Hãng", dataIndex: "brand" },
                    { title: "Mẫu xe", dataIndex: "model" },
                    { title: "Màu", dataIndex: "color" },
                    { title: "Năm sản xuất", dataIndex: "manufactureYear" },
                    {
                        title: "Hành động",
                        render: (_, record) => (
                            <div className="space-x-2">
                                <Button onClick={() => openDrawerForEdit(record)}>
                                    Sửa
                                </Button>
                                <Button danger onClick={() => handleDelete(record.id)}>
                                    Xoá
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />

            <Drawer
                title={editingVehicle ? "Cập nhật xe" : "Thêm xe mới"}
                onClose={() => setOpen(false)}
                open={open}
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
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="licensePlate" label="Biển số" rules={[{ required: true, message: "Nhập biển số" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="vehicleType" label="Loại xe" rules={[{ required: true, message: "Chọn loại xe" }]}>
                        <Select>
                            <Option value="CAR">Ô tô</Option>
                            <Option value="MOTORBIKE">Xe máy</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="brand" label="Hãng" rules={[{ required: true, message: "Nhập hãng xe" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="model" label="Mẫu xe">
                        <Input />
                    </Form.Item>
                    <Form.Item name="color" label="Màu">
                        <Input />
                    </Form.Item>
                    <Form.Item name="manufactureYear" label="Năm sản xuất">
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default VehiclesInfo;
