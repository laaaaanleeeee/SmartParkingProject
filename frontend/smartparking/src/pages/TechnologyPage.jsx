import React from "react";
import { Tag } from "antd";
import Atropos from "atropos/react";
import { useTheme } from "../hooks/useTheme";
import Img1 from "../assets/camera.jpg";
import Img2 from "../assets/barrier.png";
import Img3 from "../assets/ovs.jpg";
import Img4 from "../assets/webapp.jpg";
import { FloatButton } from "antd";

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
  const textClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const sectionBg =
    theme === "dark"
      ? "bg-gray-900"
      : "bg-gradient-to-br from-blue-50 via-green-50 to-blue-100";

  return (
    <section className={`min-h-screen ${sectionBg}`}>
      <div className="py-20 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Công nghệ trong Smart Parking
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Smart Parking ứng dụng các công nghệ tiên tiến để nâng cao trải nghiệm và tối ưu hóa quản lý bãi đỗ.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 py-20 max-w-7xl mx-auto px-6">
        {technologies.map((tech, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <Atropos className="h-60 overflow-hidden">
              <img
                src={tech.img}
                alt={tech.title}
                className="w-full h-60 object-cover"
              />
            </Atropos>

            <div className={`p-8 space-y-6 ${textClass}`}>
              <h2 className="text-2xl font-bold hover:text-green-500 transition-colors">
                {tech.title}
              </h2>

              <ul className="list-disc pl-5 space-y-2 text-base leading-relaxed">
                {tech.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <div>
                <h3 className="text-lg font-semibold mb-2">Cách hoạt động:</h3>
                <p className="opacity-80">{tech.howItWorks}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Lợi ích:</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.benefits.map((b, i) => (
                    <Tag
                      color="green"
                      key={i}
                      className="rounded-full px-3 py-1 text-sm font-medium"
                    >
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
