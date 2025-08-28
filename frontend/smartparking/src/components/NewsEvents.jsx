import React from 'react';
import Img1 from '../assets/parkinglotimg.jpg';
import Img2 from '../assets/parkinglotimg2.jpg';
import Img3 from '../assets/parkinglotimg3.jpg';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Carousel } from 'antd';

const news = [
    { img: Img1, title: 'Smart Park tại TP.HCM', desc: 'Hệ thống đỗ xe thông minh đầu tiên tại Việt Nam.' },
    { img: Img2, title: 'Cập nhật ANPR 2025', desc: 'Nhận diện biển số với độ chính xác lên đến 98%.' },
    { img: Img3, title: 'Giảm 20% khí thải đô thị', desc: 'Ứng dụng giúp cải thiện môi trường.' },
];

const NewsEvents = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const cardBg = isDark ? 'bg-gray-800' : 'bg-white';
    const sectionBg = isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-green-100 to-blue-100';
    const descColor = isDark ? 'text-gray-300' : 'text-gray-600';

    return (
        <section className={`py-20 ${sectionBg}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${textColor}`}>
                    Tin tức & Sự kiện
                </h2>

                <Carousel
                    autoplay
                    dots={true}
                    responsive={[
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 768, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {news.map((item, idx) => (
                        <div key={idx} className="px-3">
                            <div className={`rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 ${cardBg}`}>
                                <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
                                <div className="p-5">
                                    <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-sm mb-4 ${descColor}`}>
                                        {item.desc}
                                    </p>
                                    <NavLink to="/news">
                                        <span className="inline-block text-sm text-blue-500 hover:text-blue-600 transition-colors">
                                            Xem chi tiết →
                                        </span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default NewsEvents;
