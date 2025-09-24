import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

const solutions = [
    { title: 'Bệnh viện' },
    { title: 'Siêu thị' },
    { title: 'Trung tâm thương mại' },
    { title: 'Sân bay' },
    { title: 'Khách sạn' },
    { title: 'Văn phòng' },
    { title: 'Trường học' },
    { title: 'Nhà hàng' },
    { title: 'Chung cư' },
    { title: 'Cư dân' },
];

const Solutions = () => {
    const { theme } = useTheme();
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-green-100 to-blue-100';

    return (
        <section id="solutions" className={`py-16 ${bgClass}`}>
            <div className="container mx-auto px-4 text-center max-w-6xl">
                <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${textClass}`}>
                    Giải pháp đỗ xe thông minh cho các khu vực
                </h2>
                <p className={`text-lg mb-10 ${textClass}`}>
                    Chúng tôi cung cấp giải pháp đỗ xe thông minh dành cho các khu vực như bệnh viện, siêu thị, trung tâm thương mại, sân bay, khách sạn, và các khu văn phòng, giúp tối ưu hóa không gian đỗ xe và nâng cao trải nghiệm người dùng.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    {solutions.map((solution, idx) => (
                        <button
                            key={idx}
                            className="px-6 py-3 bg-white text-black rounded-lg shadow-md hover:bg-green-600 transform transition-all duration-300 hover:scale-105"
                        >
                            {solution.title}
                        </button>
                    ))}
                </div>

                <div className="mt-15 flex justify-center">
                    <p className='flex items-center font-bold text-xl mr-10'>Tìm hiểu thêm về các ngành công nghiệp chúng tôi phục vụ</p>
                    <NavLink
                        to="/solutions"
                        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
                    >
                        Xem chi tiết
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Solutions;
