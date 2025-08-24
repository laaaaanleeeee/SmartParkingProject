import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Carousel, Card, Timeline } from 'antd';
import { CarOutlined, CreditCardOutlined, CameraOutlined, SafetyOutlined, DashboardOutlined, MobileOutlined } from '@ant-design/icons';
import ImgBg1 from '../assets/parkinglotimg.jpg';
import ImgBg2 from '../assets/parkinglotimg2.jpg';
import ImgBg3 from '../assets/parkinglotimg3.jpg';
import ImgHardware1 from '../assets/camera.jpg';
import ImgHardware2 from '../assets/barrier.png';
import ImgHardware3 from '../assets/ovs.jpg';
import ImgHardware4 from '../assets/webapp.jpg';
import { useTheme } from '../hooks/useTheme';

const HomePage = () => {
  const { theme } = useTheme();
  const bgClass1 = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const bgClass2 = theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-green-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`min-h-screen font-sans ${bgClass1}`}>
      <section className="relative h-[80vh] overflow-hidden">
        <Carousel autoplay effect="fade" className="h-full">
          {[ImgBg1, ImgBg2, ImgBg3].map((img, idx) => (
            <div key={idx} className="relative h-[80vh]">
              <img
                src={img}
                alt="Smart Parking"
                className="w-full h-full object-cover brightness-50 transform transition-transform duration-1000 hover:scale-110"
              />
            </div>
          ))}
        </Carousel>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
            <span className="text-blue-400">Smart Park</span> – Đỗ xe thông minh, tương lai bền vững
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Tìm chỗ đỗ nhanh chóng, an toàn và tiện lợi với công nghệ tự động nhận diện biển số và quản lý thời gian thực.
          </p>
          <NavLink to="/parking-lots">
            <Button type="primary" size="large" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg animate-bounce">
              Đặt chỗ ngay
            </Button>
          </NavLink>
        </div>
      </section>

      <section className={`py-16 ${bgClass2}`}>
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${textClass}`}>
            Lợi ích của <span className="text-blue-500">Smart Park</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Tiết kiệm thời gian',
                desc: 'Tìm và đặt chỗ đỗ chỉ trong vài giây, giảm thời gian chờ đợi và tắc nghẽn.',
                icon: <CarOutlined className="text-4xl text-blue-500" />,
                borderColor: 'border-blue-400',
              },
              {
                title: 'Thân thiện môi trường',
                desc: 'Giảm khí thải nhờ tối ưu hóa hành trình tìm chỗ đỗ và quản lý bãi đỗ hiệu quả.',
                icon: <SafetyOutlined className="text-4xl text-green-500" />,
                borderColor: 'border-green-400',
              },
              {
                title: 'Tăng hiệu quả quản lý',
                desc: 'Tự động hóa quy trình, giảm chi phí vận hành và cải thiện trải nghiệm người dùng.',
                icon: <DashboardOutlined className="text-4xl text-purple-500" />,
                borderColor: 'border-purple-400',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border-2 ${item.borderColor} bg-opacity-80 hover:rotate-2 transition-transform duration-300 ${bgClass1}`}
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-md">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 ${bgClass1}`}>
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${textClass}`}>
            Tính năng nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: <MobileOutlined className="text-5xl text-blue-600" />,
                title: 'Đặt chỗ trực tuyến',
                desc: 'Đặt chỗ trước qua web hoặc app, hiển thị chỗ trống theo thời gian thực.',
                bgClass: 'bg-blue-100 bg-opacity-30 backdrop-blur-md',
              },
              {
                icon: <CameraOutlined className="text-5xl text-green-600" />,
                title: 'Nhận diện biển số',
                desc: 'Camera tự động quét biển số xe, mở barrier cho xe đã đặt chỗ.',
                bgClass: 'bg-green-100 bg-opacity-30 backdrop-blur-md',
              },
              {
                icon: <DashboardOutlined className="text-5xl text-purple-600" />,
                title: 'Giám sát chỗ đỗ',
                desc: 'Cảm biến và camera cập nhật trạng thái bãi đỗ thời gian thực.',
                bgClass: 'bg-purple-100 bg-opacity-30 backdrop-blur-md',
              },
              {
                icon: <CreditCardOutlined className="text-5xl text-orange-600" />,
                title: 'Thanh toán tự động',
                desc: 'Thanh toán linh hoạt qua ví điện tử, thẻ, hoặc QR code.',
                bgClass: 'bg-orange-100 bg-opacity-30 backdrop-blur-md',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-t-3xl rounded-br-3xl ${feature.bgClass} border border-gray-200/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
              >
                <div className="flex justify-center mb-4 transform hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 ${bgClass2} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 50,100" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${textClass}`}>
            Quy trình hoạt động
          </h2>
          <Timeline
            mode="alternate"
            items={[
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">1. Tìm chỗ đỗ</h3>
                    <p className="text-gray-600">Tìm bãi đỗ gần nhất qua web/app với bản đồ thời gian thực.</p>
                  </div>
                ),
                color: 'blue',
              },
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">2. Đặt chỗ</h3>
                    <p className="text-gray-600">Chọn vị trí và giữ chỗ trước, nhận xác nhận tức thì.</p>
                  </div>
                ),
                color: 'green',
              },
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">3. Vào bãi</h3>
                    <p className="text-gray-600">Camera nhận diện biển số, barrier tự động mở cho xe hợp lệ.</p>
                  </div>
                ),
                color: 'purple',
              },
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">4. Rời bãi</h3>
                    <p className="text-gray-600">Thanh toán tự động, barrier mở, hệ thống cập nhật chỗ trống.</p>
                  </div>
                ),
                color: 'orange',
              },
            ]}
          />
        </div>
      </section>

      <section className={`py-20 ${bgClass1} bg-gradient-to-r from-blue-50 to-blue-100`}>
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <h2 className={`text-4xl md:text-5xl font-bold mb-12 ${textClass}`}>
            Mô phỏng hệ thống
          </h2>
          <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
            Hệ thống Smart Park tích hợp công nghệ ANPR, IoT, và ứng dụng quản lý để tự động hóa quy trình đỗ xe, đem đến trải nghiệm đỗ xe thông minh và tiện lợi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { img: ImgHardware1, title: 'Camera ANPR', desc: 'Nhận diện biển số xe tự động, kiểm soát ra vào.' },
              { img: ImgHardware2, title: 'Barrier thông minh', desc: 'Tự động mở/đóng dựa trên dữ liệu biển số.' },
              { img: ImgHardware3, title: 'Cảm biến IoT', desc: 'Giám sát chỗ trống thời gian thực.' },
              { img: ImgHardware4, title: 'Ứng dụng quản lý', desc: 'Đặt chỗ, thanh toán, và giám sát từ xa.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 mb-6 p-6 ${bgClass2}`}
              >
                <img src={item.img} alt={item.title} className="object-cover rounded-lg mb-6 w-full h-40" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
          <NavLink to="/technologies">
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg mt-8 transition-all duration-300"
            >
              Tìm hiểu công nghệ
            </Button>
          </NavLink>
        </div>
      </section>


      <section className={`py-16 ${bgClass2}`}>
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${textClass}`}>
            Tin tức & Sự kiện
          </h2>
          <Carousel
            slidesToShow={3}
            slidesToScroll={1}
            autoplay
            responsive={[
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 480, settings: { slidesToShow: 1 } },
            ]}
          >
            {[
              { img: ImgBg1, title: 'Smart Park ra mắt tại TP.HCM', desc: 'Hệ thống đỗ xe thông minh đầu tiên tại Việt Nam.' },
              { img: ImgBg2, title: 'Cập nhật công nghệ ANPR', desc: 'Độ chính xác nhận diện biển số đạt 98%.' },
              { img: ImgBg3, title: 'Giảm 20% khí thải', desc: 'Smart Park giúp giảm ô nhiễm tại đô thị.' },
            ].map((news, idx) => (
              <div key={idx} className="px-2">
                <div className={`p-4 rounded-lg bg-white shadow-md hover:-rotate-3 transition-transform duration-300 ${bgClass1}`}>
                  <img src={news.img} alt={news.title} className="h-48 object-cover rounded-t-lg" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{news.title}</h3>
                    <p className="text-gray-600 mb-2">{news.desc}</p>
                    <NavLink to="/news">
                      <span className="text-blue-500 hover:underline">Xem chi tiết</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className={`py-16 ${bgClass1} text-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-20 animate-gradient-x"></div>
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${textClass}`}>
            Tư vấn ngay hôm nay
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Liên hệ với chúng tôi để triển khai giải pháp Smart Park cho bãi đỗ của bạn.
          </p>
          <NavLink to="/contact">
            <Button
              type="primary"
              size="large"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full text-lg animate-pulse"
            >
              Liên hệ ngay
            </Button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default HomePage;