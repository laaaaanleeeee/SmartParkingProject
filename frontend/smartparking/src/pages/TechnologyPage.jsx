import React from "react";
import { Tag } from "antd";
import Atropos from "atropos/react";
import { useTheme } from "../hooks/useTheme";
import Img1 from "../assets/camera.jpg";
import Img2 from "../assets/barrier.png";
import Img3 from "../assets/ovs.jpg";
import Img4 from "../assets/webapp.jpg";
import { FloatButton } from 'antd';

const technologies = [
  {
    img: Img1,
    title: "Camera ANPR (Automatic Number Plate Recognition)",
    details: [
      "Nhận diện biển số xe bằng Computer Vision.",
      "Lưu trữ hình ảnh, đối chiếu với cơ sở dữ liệu.",
      "Kết nối trực tiếp với barrier để tự động mở khi hợp lệ.",
    ],
    benefits: ["Nhanh chóng", "Chính xác", "Giảm nhân sự"],
    howItWorks:
      "Khi xe đến cổng, camera quét biển số → xử lý ảnh → gửi dữ liệu đến server → đối chiếu CSDL → mở barrier nếu hợp lệ.",
  },
  {
    img: Img2,
    title: "Barrier thông minh",
    details: [
      "Kết nối đồng bộ với camera ANPR.",
      "Có cảm biến phát hiện vật cản để đảm bảo an toàn.",
      "Tự động điều khiển đóng/mở trong 3–5 giây.",
    ],
    benefits: ["An toàn", "Tự động hóa", "Hạn chế ùn tắc"],
    howItWorks:
      "Sau khi xác thực, hệ thống gửi tín hiệu → barrier mở → xe đi qua → barrier tự hạ xuống.",
  },
  {
    img: Img3,
    title: "Cảm biến IoT",
    details: [
      "Theo dõi trạng thái chỗ đỗ (có xe/trống).",
      "Truyền dữ liệu realtime lên server.",
      "Cập nhật bản đồ bãi đỗ trên ứng dụng.",
    ],
    benefits: ["Realtime", "Chính xác", "Trải nghiệm tốt"],
    howItWorks:
      "Xe chiếm chỗ → cảm biến thay đổi trạng thái → gửi tín hiệu IoT → server cập nhật → app hiển thị trạng thái.",
  },
  {
    img: Img4,
    title: "Ứng dụng quản lý & WebApp",
    details: [
      "Mobile App cho khách: đặt chỗ, thanh toán.",
      "WebApp cho chủ bãi: quản lý doanh thu, báo cáo.",
      "Tích hợp cổng thanh toán trực tuyến.",
    ],
    benefits: ["Thuận tiện", "Minh bạch", "Tối ưu vận hành"],
    howItWorks:
      "Người dùng mở app → chọn bãi → thanh toán online → nhận mã QR → quét QR khi vào → hệ thống đồng bộ dữ liệu.",
  },
];

const TechnologyPage = () => {
  const { theme } = useTheme();
  const textClass = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <section className="min-h-screen">
      <div className="py-20 text-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Công nghệ trong Smart Parking
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Hệ thống Smart Parking áp dụng loạt công nghệ hiện đại để tối ưu việc quản lý và trải nghiệm của người dùng.
        </p>
      </div>

      <div className="space-y-32 py-20 max-w-7xl mx-auto px-6">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 relative group">
              <Atropos
                className="rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-105"
                rotateXMax={15}
                rotateYMax={15}
              >
                <img
                  src={tech.img}
                  alt={tech.title}
                  className="rounded-xl w-full h-80 object-cover"
                />
              </Atropos>
            </div>

            <div className={`md:w-1/2 space-y-6 ${textClass}`}>
              <h2 className="text-3xl font-bold hover:text-green-500 transition-colors duration-300">
                {tech.title}
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {tech.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <div>
                <h3 className="text-xl font-semibold mb-2">Cách hoạt động:</h3>
                <p className="opacity-80">{tech.howItWorks}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Lợi ích:</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.benefits.map((b, i) => (
                    <Tag color="green" key={i} className="text-base px-3 py-1 rounded-full">
                      {b}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FloatButton.BackTop />
    </section>
  );
};

export default TechnologyPage;
