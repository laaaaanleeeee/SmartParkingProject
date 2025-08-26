import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getParkingLotDetail } from "../services/ParkingLotService";
import { getMyVehicles } from "../services/VehicleService";
import { getSlotByParkingLotId } from "../services/SlotService";
import { createBooking } from "../services/BookingService";
import {
  Form,
  Button,
  DatePicker,
  Select,
  Card,
  Typography,
  message,
  Spin,
} from "antd";
import moment from "moment";

const { Title, Text } = Typography;
const { Option } = Select;

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [parkingLot, setParkingLot] = useState(location.state?.parkingLot || null);
  const [vehicles, setVehicles] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesRes = await getMyVehicles();
        setVehicles(vehiclesRes.data);

        if (!parkingLot) {
          const res = await getParkingLotDetail(id);
          setParkingLot(res.data);
        }

        const slotsRes = await getSlotByParkingLotId(id);
        setSlots(slotsRes.data);
      } catch (error) {
        console.error(error);
        message.error("Không thể tải dữ liệu đặt chỗ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, parkingLot]);

  const onFinish = async (values) => {
    setSubmitting(true);
    const bookingData = {
      parkingLotId: id,
      parkingSlotId: values.parkingSlotId,
      vehicleId: values.vehicleId,
      startTime: values.startTime.toISOString(),
      endTime: values.endTime.toISOString(),
      voucherId: null,
    };

    try {
      const res = await createBooking(bookingData);
      message.success("Đặt chỗ thành công, vui lòng thanh toán!");
      navigate(`/payment/${res.data.id}`, { state: { booking: res.data, method: values.paymentMethod } });
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Đặt chỗ thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spin size="large" className="mt-24 mx-auto block" />;
  if (!parkingLot) return <div className="py-20 text-center text-red-500">Không tìm thấy bãi đỗ</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="rounded-lg shadow-lg">
        <Title level={3}>Đặt chỗ cho bãi đỗ: {parkingLot.name}</Title>

        <Text type="secondary" className="block mb-6">
          Địa chỉ: {parkingLot.address}, {parkingLot.ward}, {parkingLot.city}
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Chọn xe"
            name="vehicleId"
            rules={[{ required: true, message: "Vui lòng chọn xe" }]}
          >
            <Select placeholder="Chọn xe của bạn">
              {vehicles.map((v) => (
                <Option key={v.id} value={v.id}>
                  {v.licensePlate} - {v.vehicleType}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chọn chỗ đỗ"
            name="parkingSlotId"
            rules={[{ required: true, message: "Vui lòng chọn chỗ đỗ" }]}
          >
            <Select placeholder="Chọn chỗ đỗ">
              {slots.map((slot) => (
                <Option key={slot.id} value={slot.id} disabled={slot.slotStatus !== "FREE"}>
                  {slot.slotNumber} {slot.slotStatus !== "FREE" ? `(${slot.slotStatus})` : ""}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Thời gian bắt đầu"
            name="startTime"
            rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="DD/MM/YYYY HH:mm"
              disabledDate={(current) => current && current < moment().startOf("day")}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Thời gian kết thúc"
            name="endTime"
            dependencies={["startTime"]}
            rules={[
              { required: true, message: "Vui lòng chọn thời gian kết thúc" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue("startTime")) return Promise.resolve();
                  if (value.isBefore(getFieldValue("startTime"))) {
                    return Promise.reject(new Error("Thời gian kết thúc phải sau thời gian bắt đầu"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="DD/MM/YYYY HH:mm"
              disabledDate={(current) => current && current < moment().startOf("day")}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Phương thức thanh toán"
            name="paymentMethod"
            rules={[{ required: true, message: "Vui lòng chọn phương thức" }]}
          >
            <Select placeholder="Chọn phương thức">
              <Option value="MOMO">MOMO</Option>
              <Option value="VNPAY">VNPAY</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting} block>
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingPage;
