import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParkingLotDetail } from '../services/ParkingLotService';
import {
  Row, Col, Card, Descriptions, List, Button, Typography, Tag, Divider,
  message,
} from 'antd';
import {
  EnvironmentOutlined,
  DollarCircleOutlined,
  StarOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const ParkingLotDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parkingLot, setParkingLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParkingLot = async () => {
      try {
        const res = await getParkingLotDetail(id);
        setParkingLot(res.data);
      } catch (err) {
        message.error(err);
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchParkingLot();
  }, [id]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Đang tải...</div>;
  if (error) return <div style={{ padding: 40, color: 'red', textAlign: 'center' }}>{error}</div>;
  if (!parkingLot) return <div style={{ padding: 40, textAlign: 'center' }}>Không tìm thấy bãi đỗ</div>;

  const mapSrc = `https://www.google.com/maps?q=${parkingLot.latitude},${parkingLot.longitude}&hl=vi&z=16&output=embed`;

  const statusColor = parkingLot.parkingLotStatus === 'OPEN' ? 'green' : 'red';

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Card
            title={
              <div className="flex-between">
                <Title level={4} style={{ marginBottom: 0, color: '#389e0d' }}>
                  {parkingLot.name}
                </Title>
              </div>
            }
            style={{ backgroundColor: '#f6ffed', borderRadius: 8 }}
          >
            <Descriptions column={1} layout="vertical" colon={false}>
              <Descriptions.Item label={<Text strong>Địa chỉ</Text>}>
                <EnvironmentOutlined /> {parkingLot.address}, {parkingLot.ward}, {parkingLot.city}
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Số chỗ</Text>}>
                <Tag color="green">{parkingLot.availableSlots}</Tag> /
                <Tag>{parkingLot.totalSlots}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Trạng thái</Text>}>
                <Tag color={statusColor}>{parkingLot.parkingLotStatus}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<Text strong>Mô tả</Text>}>
                {parkingLot.description}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5} style={{ color: '#52c41a' }}>
              <DollarCircleOutlined /> Giá theo giờ
            </Title>
            <List
              size="small"
              bordered
              dataSource={parkingLot.pricings}
              renderItem={item => (
                <List.Item>
                  <b>{item.vehicleType}</b>: {item.pricePerHour} VNĐ/giờ
                  {item.startTime && ` (từ ${item.startTime} đến ${item.endTime})`}
                </List.Item>
              )}
              style={{ marginBottom: 24 }}
            />

            <Title level={5} style={{ color: '#52c41a' }}>
              <StarOutlined /> Đánh giá
            </Title>
            <List
              size="small"
              bordered
              dataSource={parkingLot.reviews}
              renderItem={review => (
                <List.Item>
                  <div>
                    ⭐ {review.rating} — "{review.comment}" – <i>{review.user.name}</i>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card
            title={<span style={{ color: '#52c41a' }}>Bản đồ</span>}
            style={{ borderRadius: 8 }}
          >
            <div style={{ width: '100%', height: 400, overflow: 'hidden', borderRadius: 8 }}>
              <iframe
                src={mapSrc}
                title="Bản đồ"
                width="100%"
                height="100%"
                allowFullScreen
              ></iframe>
            </div>
          </Card>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => navigate(`/parking-lots/${parkingLot.id}/booking`, { state: { parkingLot } })}
              style={{
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
                borderRadius: 6,
              }}
            >
              Đặt chỗ ngay
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ParkingLotDetailPage;
