import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getParkingLotDetail } from '../services/ParkingLotService';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Card,
  Typography,
  message,
  Spin,
} from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [parkingLot, setParkingLot] = useState(location.state?.parkingLot || null);
  const [loading, setLoading] = useState(!location.state?.parkingLot);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!parkingLot) {
      setLoading(true);
      getParkingLotDetail(id)
        .then(res => {
          setParkingLot(res.data);
        })
        .catch(() => {
          message.error('Không thể tải thông tin bãi đỗ');
        })
        .finally(() => setLoading(false));
    }
  }, [id, parkingLot]);

  const onFinish = (values) => {
    setSubmitting(true);

    const bookingData = {
      parkingLotId: id,
      customerName: values.customerName,
      phone: values.phone,
      vehicleType: values.vehicleType,
      startTime: values.timeRange[0].toISOString(),
      endTime: values.timeRange[1].toISOString(),
    };

    setTimeout(() => {
      setSubmitting(false);
      message.success('Đặt chỗ thành công!');
      navigate('/history_booking');
    }, 1500);
  };

  if (loading)
    return <Spin size="large" className="mt-24 mx-auto block" />;

  if (!parkingLot)
    return (
      <div className="py-20 text-center text-red-500 text-lg">
        Không tìm thấy bãi đỗ
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="rounded-lg shadow-lg">
        <Title level={3} className="mb-6 text-green-600">
          Đặt chỗ cho bãi đỗ: {parkingLot.name}
        </Title>

        <Text type="secondary" className="block mb-1">
          Địa chỉ: {parkingLot.address}, {parkingLot.ward}, {parkingLot.city}
        </Text>
        <Text type="secondary" className="block mb-6">
          Số chỗ trống: {parkingLot.availableSlots} / {parkingLot.totalSlots}
        </Text>

        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            vehicleType: 'car',
            timeRange: [moment(), moment().add(1, 'hour')],
          }}
        >
          <Form.Item
            label="Tên người đặt"
            name="customerName"
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
          >
            <Input placeholder="Nhập tên" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                pattern: /^[0-9]{9,11}$/,
                message: 'Số điện thoại không hợp lệ (9-11 số)',
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label="Loại xe"
            name="vehicleType"
            rules={[{ required: true, message: 'Vui lòng chọn loại xe' }]}
          >
            <Select className="rounded-md">
              <Option value="car">Ô tô</Option>
              <Option value="motorbike">Xe máy</Option>
              <Option value="bicycle">Xe đạp</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Thời gian đặt chỗ"
            name="timeRange"
            rules={[
              { required: true, message: 'Vui lòng chọn thời gian bắt đầu và kết thúc' },
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) {
                    return Promise.reject('Vui lòng chọn thời gian đầy đủ');
                  }
                  if (value[0].isAfter(value[1])) {
                    return Promise.reject('Thời gian bắt đầu phải trước thời gian kết thúc');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="DD/MM/YYYY HH:mm"
              disabledDate={(current) => current && current < moment().startOf('day')}
              className="w-full rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              className="rounded-md bg-green-600 hover:bg-green-700 border-green-600"
            >
              Đặt chỗ ngay
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingPage;
