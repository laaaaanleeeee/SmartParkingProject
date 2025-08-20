import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Carousel } from 'antd';
import { CarOutlined, CreditCardOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Camera, ShieldCheck, Radar, Smartphone, ArrowRight } from "lucide-react";
import ImgBg1 from '../assets/parkinglotimg.jpg';
import ImgBg2 from '../assets/parkinglotimg2.jpg';
import ImgBg3 from '../assets/parkinglotimg3.jpg';
import ImgHarware1 from '../assets/camera.jpg';
import ImgHarware2 from '../assets/barrier.png';
import ImgHarware3 from '../assets/ovs.jpg';
import ImgHarware4 from '../assets/webapp.jpg';
import { useTheme } from "../hooks/useTheme";
import { NavLink } from "react-router-dom";


const HomePage = () => {
    const { theme } = useTheme();

    const bgClass1 = theme === 'dark' ? 'bg-black' : 'bg-white';
    const bgClass2 = theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-green-100 to-blue-100';
    const bgClass3 = theme === 'dark' ? 'bg-gray-600' : 'bg-white';

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <section className="relative">
                <Carousel autoplay effect="fade">
                    {[ImgBg1, ImgBg2, ImgBg3].map((img, idx) => (
                        <div key={idx} className="relative h-[85vh]">
                            <img src={img} alt="Parking Lot" className="w-full h-full object-cover" />
                            <div className="absolute inset-0" />
                        </div>
                    ))}
                </Carousel>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-fadeIn">
                        Chào mừng đến với <span className="text-yellow-400">Smart Park</span>
                    </h1>
                    <p className="text-xl mb-6 max-w-2xl mx-auto">
                        Tìm kiếm và đặt chỗ đỗ xe dễ dàng ở mọi nơi, mọi lúc chỉ với vài thao tác.
                    </p>
                    <NavLink to="/parking_lots">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-2 text-lg rounded-full shadow-lg"
                        >
                            Đặt chỗ ngay
                        </Button>
                    </NavLink>
                </div>
            </section>

            <section className={`py-20 ${bgClass1}`}>
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <img src={ImgBg2} alt="About Smart Park" className="rounded-2xl shadow-lg" />
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Hệ thống Smart Park</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Smart Park là hệ thống đỗ xe thông minh giúp bạn tìm kiếm và đặt chỗ một cách nhanh chóng, tiện lợi và an toàn.
                        </p>
                        <ul className="text-gray-700 space-y-3">
                            <li>✅ Tìm kiếm nhanh chóng, dễ dàng</li>
                            <li>✅ Thanh toán an toàn, đa phương thức</li>
                            <li>✅ Hỗ trợ khách hàng 24/7</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={`py-20 ${bgClass2}`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Tính năng nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: <CarOutlined className="text-4xl text-blue-500" />, title: "Tìm kiếm nhanh chóng", desc: "Dễ dàng tìm chỗ đỗ gần bạn." },
                            { icon: <CreditCardOutlined className="text-4xl text-green-500" />, title: "Thanh toán dễ dàng", desc: "An toàn, nhanh chóng, đa phương thức." },
                            { icon: <CustomerServiceOutlined className="text-4xl text-red-500" />, title: "Hỗ trợ 24/7", desc: "Luôn sẵn sàng giúp đỡ bạn." }
                        ].map((f, idx) => (
                            <div key={idx} className={`${bgClass3} p-8 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition`}>
                                <div className="mb-4">{f.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`py-20 ${bgClass1}`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Quy trình hoạt động của Smart Park</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Tìm chỗ đỗ", desc: "Người dùng mở ứng dụng để tìm vị trí đỗ xe gần nhất." },
                            { step: "2", title: "Đặt chỗ", desc: "Chọn bãi đỗ phù hợp và đặt chỗ trong vài giây." },
                            { step: "3", title: "Thanh toán", desc: "Hoàn tất thanh toán trực tuyến an toàn." },
                            { step: "4", title: "Vào bãi", desc: "Xe được nhận diện tự động qua camera/barrier." },
                        ].map((s, idx) => (
                            <div
                                key={idx}
                                className={`${bgClass3} p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2`}
                            >
                                <div className="text-4xl font-bold text-blue-600 mb-4">{s.step}</div>
                                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`py-20 ${bgClass2}`}>
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Mô phỏng phần cứng hệ thống</h2>

                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center m-10">
                        <img src={ImgHarware1} alt="Camera nhận diện" className="rounded-2xl shadow-lg" />
                        <div>
                            <div className="mb-4">
                                <Camera className="w-12 h-12 text-blue-600 mx-auto" />
                            </div>
                            <h2 className="text-4xl font-bold mb-6">Camera nhận diện</h2>
                            <p className="text-lg mb-6">
                                Ghi nhận biển số xe và kiểm soát ra vào.
                            </p>
                            <ul className=" space-y-3">
                                <li>✅ Ghi nhận biển số xe tự động</li>
                                <li>✅ Kiểm soát ra vào theo thời gian thực</li>
                                <li>✅ Tăng cường bảo mật và chính xác</li>
                            </ul>
                        </div>
                    </div>

                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center m-10">
                        <div>
                            <div className="mb-4">
                                <ShieldCheck className="w-12 h-12 text-green-600 mx-auto" />
                            </div>
                            <h2 className="text-4xl font-bold mb-6">Barrier thông minh</h2>
                            <p className="text-lg  mb-6">
                                Tự động mở/đóng khi xe hợp lệ.
                            </p>
                            <ul className=" space-y-3">
                                <li>✅ Mở/đóng tự động theo biển số xe</li>
                                <li>✅ Tăng cường hiệu quả và giảm thiểu tắc nghẽn</li>
                                <li>✅ Hệ thống an toàn cao, chống va chạm</li>
                            </ul>
                        </div>
                        <img src={ImgHarware2} alt="Barrier thông minh" className="rounded-2xl shadow-lg" />
                    </div>

                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center m-10">
                        <img src={ImgHarware3} alt="Cảm biến bãi đỗ" className="rounded-2xl shadow-lg" />
                        <div>
                            <div className="mb-4">
                                <Radar className="w-12 h-12 text-purple-600 mx-auto" />
                            </div>
                            <h2 className="text-4xl font-bold mb-6">Cảm biến bãi đỗ</h2>
                            <p className="text-lg  mb-6">
                                Theo dõi tình trạng chỗ trống theo thời gian thực.
                            </p>
                            <ul className=" space-y-3">
                                <li>✅ Giám sát chính xác các bãi đỗ xe trống</li>
                                <li>✅ Cung cấp dữ liệu thời gian thực cho người dùng</li>
                                <li>✅ Cải thiện trải nghiệm tìm kiếm và sử dụng bãi đỗ</li>
                            </ul>
                        </div>
                    </div>

                    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center m-10">
                        <div>
                            <div className="mb-4">
                                <Smartphone className="w-12 h-12 text-orange-600 mx-auto" />
                            </div>
                            <h2 className="text-4xl font-bold mb-6">Ứng dụng quản lý</h2>
                            <p className="text-lg  mb-6">
                                Điều khiển và giám sát toàn bộ hệ thống từ xa.
                            </p>
                            <ul className=" space-y-3">
                                <li>✅ Giám sát tình trạng toàn bộ hệ thống từ xa</li>
                                <li>✅ Quản lý đặt chỗ và thanh toán trực tuyến</li>
                                <li>✅ Tối ưu hóa và theo dõi bãi đỗ xe trong thời gian thực</li>
                            </ul>
                        </div>
                        <img src={ImgHarware4} alt="Ứng dụng quản lý" className="rounded-2xl shadow-lg" />
                    </div>
                </div>
            </section>



            <section className={`py-20 ${bgClass1} text-center`}>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-10">Tin tức & Sự kiện</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                                <img src={ImgBg3} alt="News" className="w-full h-48 object-cover" />
                                <div className={`p-6 text-left ${bgClass3}`}>
                                    <h3 className="text-xl font-semibold mb-2">Tin tức #{i}</h3>
                                    <p className=" mb-4">Cập nhật những thông tin mới nhất về Smart Park.</p>
                                    <Link to="/news">
                                        <span className="text-blue-500 hover:underline">Xem chi tiết →</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`py-20 text-center ${bgClass2}`}>
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng đặt chỗ chưa?</h2>
                    <p className="text-lg mb-6">Khám phá ngay các bãi đỗ xe gần bạn.</p>
                    <NavLink to="/parking_lots">
                        <Button type="primary" size="large" className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2 text-lg rounded-full shadow-lg">
                            Đặt chỗ ngay
                        </Button>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
