import React from "react";
import { FloatButton, Carousel } from "antd";
import { useTheme } from "../hooks/useTheme";
import CEOImg from "../assets/errorImg.jpg";
import CTOImg from "../assets/errorImg.jpg";
import DoXe from "../assets/doxe.jpg";
import VietNam from "../assets/covietnam.jfif";
import TechImg from "../assets/phattrien.jpg";
import LogoImg from "../assets/S.png";

const ContactPage = () => {
  const { theme } = useTheme();

  const sectionBg =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 text-gray-800";

  return (
    <section className={`min-h-screen ${sectionBg}`}>
      <div className="py-20 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Về chúng tôi
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Tiên phong ứng dụng công nghệ ANPR, IoT và AI để mang lại giải pháp
          quản lý bãi đỗ xe hiện đại, minh bạch và hiệu quả.
        </p>
      </div>

      <div className="space-y-32 py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Giới thiệu công ty</h2>
            <p className="text-lg leading-relaxed opacity-90 mb-6">
              Smart Parking được thành lập với sứ mệnh cải thiện trải nghiệm
              người dùng khi tìm chỗ đỗ xe, đồng thời mang lại giải pháp quản lý
              tối ưu cho các chủ bãi. Chúng tôi hợp tác cùng nhiều đối tác lớn
              trên cả nước để xây dựng hệ sinh thái đỗ xe thông minh.
            </p>
            <ul className="space-y-3 text-lg">
              <li>✔ Hơn 10 năm kinh nghiệm triển khai</li>
              <li>✔ Có mặt tại 5 thành phố lớn</li>
              <li>✔ Hàng ngàn khách hàng tin dùng</li>
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={LogoImg}
              alt="About Company"
              className="object-cover w-full h-80"
            />
          </div>
        </div>

        <div className="max-w-full mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Hình ảnh hoạt động</h2>
          <Carousel autoplay className="rounded-xl overflow-hidden shadow-lg">
            {[VietNam, TechImg, DoXe].map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-96 object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Đội ngũ lãnh đạo
          </h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center">
            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src={CEOImg}
                alt="CEO"
                className="w-40 h-40 object-cover rounded-full border-4 border-green-500 shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold">Nguyễn Văn A</h3>
                <p className="text-green-600 font-medium">CEO - Founder</p>
                <p className="mt-2 max-w-sm opacity-80">
                  Định hướng chiến lược phát triển và dẫn dắt công ty trong quá
                  trình chuyển đổi số.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <img
                src={CTOImg}
                alt="CTO"
                className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold">Trần Thị B</h3>
                <p className="text-blue-600 font-medium">CTO</p>
                <p className="mt-2 max-w-sm opacity-80">
                  Phụ trách công nghệ, kiến trúc hệ thống và nghiên cứu các giải
                  pháp AI/IoT để tối ưu hóa vận hành.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Thông tin liên hệ</h3>
            <p className="mb-4">📞 Hotline: 0368063473</p>
            <p className="mb-4">✉️ Email: lehailan110@gmail.com</p>
            <p>
              📍 <strong>Hà Nội:</strong> Tây Hồ <br />
              📍 <strong>TP.HCM:</strong> Bến Thành
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59569.57039009736!2d105.77920460928857!3d21.068741780954664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aae54053e2d5%3A0x2d72b1d7c422234b!2zVMOieSBI4buTLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1755550468190!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-center mb-12 mt-20">
            Hãy Để Chúng Tôi Tư Vấn Đến Bạn
          </h3>
          <form className="grid gap-4 max-w-full mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="number"
              placeholder="Số điện thoại"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="4"
              placeholder="Nội dung"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 cursor-pointer transition block mx-auto"
            >
              Nhận tư vấn
            </button>
          </form>
        </div>
        <FloatButton.BackTop />
      </div>
    </section>
  );
};

export default ContactPage;
