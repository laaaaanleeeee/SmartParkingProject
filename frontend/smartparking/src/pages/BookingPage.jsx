import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getParkingLotDetail } from "../services/ParkingLotService";
import { getMyVehicles } from "../services/VehicleService";
import { getSlotByParkingLotId } from "../services/SlotService";
import { createBooking } from "../services/BookingService";
import { Form, Button, DatePicker, Select, message, Spin } from "antd";
import { Car, MapPin } from "lucide-react";
import moment from "moment";
import { useTheme } from "../hooks/useTheme";

const { Option } = Select;

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [parkingLot, setParkingLot] = useState(location.state?.parkingLot || null);
  const [vehicles, setVehicles] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const textClass1 = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textClass2 = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";

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
      navigate(`/payment/${res.data.id}`, {
        state: { booking: res.data, method: values.paymentMethod },
      });
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Đặt chỗ thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className={`flex justify-center items-center min-h-screen ${bgMain}`}>
        <Spin size="large" />
      </div>
    );

  if (!parkingLot)
    return (
      <div className={`py-20 text-center text-red-500 ${bgMain}`}>
        Không tìm thấy bãi đỗ
      </div>
    );

  return (
    <div className={`min-h-screen ${bgMain} flex justify-center items-start p-6`}>
      <div className={`w-full max-w-2xl ${bgCard} rounded-2xl shadow-lg p-8`}>
        <h2 className={`text-2xl font-semibold mb-2 flex items-center gap-2 ${textClass1}`}>
          <Car className="w-6 h-6 text-green-500" /> Đặt chỗ cho bãi đỗ
        </h2>
        <p className={`mb-6 flex items-center gap-2 ${textClass2}`}>
          <MapPin className="w-5 h-5 text-green-500" />
          {parkingLot.address}, {parkingLot.ward}, {parkingLot.city}
        </p>

        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            label={<span className={textClass1}>Chọn xe</span>}
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
            label={<span className={textClass1}>Chọn chỗ đỗ</span>}
            name="parkingSlotId"
            rules={[{ required: true, message: "Vui lòng chọn chỗ đỗ" }]}
          >
            <Select placeholder="Chọn khu đỗ">
              {slots.map((slot) => (
                <Option
                  key={slot.id}
                  value={slot.id}
                  disabled={slot.slotStatus !== "FREE"}
                >
                  {slot.slotNumber}{" "}
                  {slot.slotStatus !== "FREE" ? `(${slot.slotStatus})` : ""}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className={textClass1}>Thời gian bắt đầu</span>}
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
            label={<span className={textClass1}>Thời gian kết thúc</span>}
            name="endTime"
            dependencies={["startTime"]}
            rules={[
              { required: true, message: "Vui lòng chọn thời gian kết thúc" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue("startTime")) return Promise.resolve();
                  if (value.isBefore(getFieldValue("startTime"))) {
                    return Promise.reject(
                      new Error("Thời gian kết thúc phải sau thời gian bắt đầu")
                    );
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
            label={<span className={textClass1}>Phương thức thanh toán</span>}
            name="paymentMethod"
            rules={[{ required: true, message: "Vui lòng chọn phương thức" }]}
          >
            <Select placeholder="Chọn phương thức">
              <Option value="MOMO">MOMO</Option>
              <Option value="VNPAY">VNPAY</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              className="bg-green-500 hover:bg-green-600"
            >
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BookingPage;
