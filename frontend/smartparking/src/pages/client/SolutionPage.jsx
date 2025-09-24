import React from "react";
import { FloatButton } from "antd";
import { useTheme } from "@/hooks/useTheme";
import {
  CheckCircleOutlined,
  BulbOutlined,
  StarOutlined,
} from "@ant-design/icons";
import ImgBg1 from "@/assets/parkinglotimg.jpg";

const solutions = [
  {
    title: "Bệnh viện",
    details: [
      "Hỗ trợ bệnh nhân và người nhà tìm chỗ đỗ xe nhanh chóng.",
      "Giảm tình trạng ùn tắc ở khu vực cấp cứu và khám bệnh.",
      "Tích hợp thẻ nhân viên y tế để ra/vào thuận tiện.",
    ],
    benefits: ["Tiện lợi", "Nhanh chóng", "Giảm stress cho bệnh nhân"],
    scenario:
      "Xe cứu thương và xe cá nhân di chuyển đến bệnh viện → hệ thống ưu tiên mở barrier nhanh cho xe cấp cứu → cảm biến IoT hiển thị chỗ trống → người dùng app chỉ dẫn đến khu vực gần nhất.",
  },
  {
    title: "Siêu thị",
    details: [
      "Tích hợp với hệ thống thành viên siêu thị để ưu đãi phí gửi xe.",
      "Tự động tính thời gian gửi xe và thanh toán qua QR.",
      "Cập nhật realtime số chỗ còn trống ở bãi xe.",
    ],
    benefits: ["Trải nghiệm khách hàng tốt", "Minh bạch", "Tăng hiệu suất vận hành"],
    scenario:
      "Khách đến siêu thị → camera nhận diện biển số → barrier mở → app hiển thị chỗ trống gần lối vào → khách mua sắm → ra về quét QR và thanh toán tự động.",
  },
  {
    title: "Trung tâm thương mại",
    details: [
      "Hỗ trợ lượng lớn phương tiện vào giờ cao điểm.",
      "Liên kết với app để đặt chỗ trước.",
      "Tích hợp với hệ thống quảng cáo, khuyến mãi.",
    ],
    benefits: ["Quản lý lưu lượng lớn", "Tối ưu không gian", "Gia tăng doanh thu"],
    scenario:
      "Khách đặt chỗ trước qua app → đến trung tâm → quét mã QR → barrier mở → hệ thống hướng dẫn đến đúng vị trí → nhận ưu đãi đỗ xe miễn phí khi mua sắm.",
  },
  {
    title: "Sân bay",
    details: [
      "Tối ưu không gian bãi xe dài ngày.",
      "Hỗ trợ khách đặt chỗ trước khi bay.",
      "Quản lý riêng khu vực taxi và xe dịch vụ.",
    ],
    benefits: ["Giảm ùn tắc", "Dễ quản lý", "Hỗ trợ nhiều loại phương tiện"],
    scenario:
      "Khách đặt chỗ online trước chuyến bay → đến sân bay quét mã → barrier mở → hệ thống ghi nhận thời gian dài ngày → thanh toán khi xe rời bãi.",
  },
  {
    title: "Khách sạn",
    details: [
      "Tích hợp với hệ thống đặt phòng để giữ chỗ đỗ xe cho khách.",
      "Phân khu vực dành riêng cho VIP hoặc hội nghị.",
      "Thanh toán phí gửi xe gộp vào hóa đơn phòng.",
    ],
    benefits: ["Trải nghiệm khách hàng cao cấp", "Tiện ích trọn gói", "Quản lý dễ dàng"],
    scenario:
      "Khách đặt phòng → hệ thống giữ chỗ đỗ tự động → khi khách đến, camera nhận diện và mở barrier → phí gửi xe được cộng dồn vào hóa đơn phòng.",
  },
  {
    title: "Văn phòng",
    details: [
      "Hỗ trợ nhân viên đăng ký chỗ đỗ cố định.",
      "Quản lý khách đến làm việc với thẻ QR.",
      "Theo dõi thống kê sử dụng bãi xe theo ngày/tuần.",
    ],
    benefits: ["Tối ưu không gian", "Minh bạch", "Hỗ trợ quản trị"],
    scenario:
      "Nhân viên đăng ký chỗ cố định → khi đi làm camera nhận diện xe → barrier mở → khách đến thì check-in bằng QR → hệ thống log dữ liệu đầy đủ.",
  },
  {
    title: "Trường học",
    details: [
      "Quản lý xe của giảng viên, sinh viên và khách.",
      "Giảm ùn tắc tại cổng trường giờ cao điểm.",
      "Hỗ trợ đăng ký vé tháng cho sinh viên.",
    ],
    benefits: ["An toàn", "Quản lý tốt", "Hỗ trợ số lượng lớn"],
    scenario:
      "Sinh viên đăng ký vé tháng → hệ thống nhận diện biển số → barrier mở → hiển thị chỗ trống theo từng khu vực (giảng viên / sinh viên).",
  },
  {
    title: "Nhà hàng",
    details: [
      "Giữ chỗ cho khách đặt bàn trước.",
      "Tích hợp với hệ thống đặt bàn online.",
      "Cung cấp dịch vụ đỗ xe tự động cho khách VIP.",
    ],
    benefits: ["Dịch vụ cao cấp", "Tiện lợi", "Tạo ấn tượng tốt"],
    scenario:
      "Khách đặt bàn → hệ thống giữ chỗ đỗ → đến nhà hàng camera nhận diện → barrier mở → nhân viên nhận thông tin xe để phục vụ tốt hơn.",
  },
  {
    title: "Chung cư",
    details: [
      "Quản lý xe cư dân theo tháng.",
      "Tự động phân khu vực cho cư dân và khách.",
      "Tích hợp với hệ thống quản lý tòa nhà.",
    ],
    benefits: ["An ninh", "Minh bạch", "Tối ưu cho cư dân"],
    scenario:
      "Cư dân đăng ký xe trên app → mỗi lần vào camera tự động nhận diện → barrier mở → khách thì quét QR để vào khu vực dành riêng.",
  },
  {
    title: "Cư dân",
    details: [
      "Quản lý riêng khu vực xe cho từng hộ gia đình.",
      "Thanh toán trực tuyến phí gửi xe hàng tháng.",
      "Thông báo realtime khi xe ra/vào bãi.",
    ],
    benefits: ["Minh bạch", "Tiện lợi", "Tăng trải nghiệm"],
    scenario:
      "Chủ hộ đăng nhập app → quản lý danh sách xe → theo dõi lịch sử ra/vào → thanh toán phí gửi xe trực tiếp trên ứng dụng.",
  },
];

const SolutionPage = () => {
  const { theme } = useTheme();
  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const sectionBg =
    theme === "dark"
      ? "bg-gray-900"
      : "bg-gradient-to-br from-blue-50 via-green-50 to-blue-100";
  
  return (
    <section className={`min-h-screen ${sectionBg}`}>
      <div className="py-20 text-center bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Giải pháp Smart Parking
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Mỗi khu vực có nhu cầu và đặc thù riêng. Dưới đây là các giải pháp mà Smart Parking
          mang lại.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">
        {solutions.map((sol, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src={ImgBg1}
                  alt="Smart Parking"
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-green-400 mb-4">
                {sol.title}
              </h2>

              <ul className="space-y-2 mb-6">
                {sol.details.map((d, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2 ${textClass}`}
                  >
                    <CheckCircleOutlined className="text-green-500 mt-1 text-lg" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-400">
                  <BulbOutlined className="text-xl" /> Kịch bản hoạt động
                </h3>
                <p className={`${textClass} mt-2 leading-relaxed`}>
                  {sol.scenario}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-400">
                  <StarOutlined className="text-xl" /> Lợi ích
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sol.benefits.map((b, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm rounded-full shadow"
                    >
                      {b}
                    </span>
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

export default SolutionPage;
