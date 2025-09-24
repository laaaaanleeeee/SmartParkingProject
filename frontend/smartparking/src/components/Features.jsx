import React from 'react';
import {
    MobileOutlined,
    CameraOutlined,
    DashboardOutlined,
    CreditCardOutlined,
} from '@ant-design/icons';
import { useTheme } from '@/hooks/useTheme';

const features = [
    {
        icon: <MobileOutlined />,
        title: 'Đặt chỗ trực tuyến',
        desc: 'Đặt trước qua web/app, hiển thị chỗ trống theo thời gian thực.',
        bgClass: 'bg-blue-100 bg-opacity-30 backdrop-blur-md',
        iconColorClass: 'text-blue-500',
        borderColor: 'border-blue-400',
    },
    {
        icon: <CameraOutlined />,
        title: 'Nhận diện biển số',
        desc: 'Camera tự động quét biển số xe, mở barrier cho xe đã đặt chỗ.',
        bgClass: 'bg-green-100 bg-opacity-30 backdrop-blur-md',
        iconColorClass: 'text-green-500',
        borderColor: 'border-green-400',
    },
    {
        icon: <DashboardOutlined />,
        title: 'Giám sát chỗ đỗ',
        desc: 'Cảm biến & camera cập nhật trạng thái bãi đỗ theo thời gian thực.',
        bgClass: 'bg-purple-100 bg-opacity-30 backdrop-blur-md',
        iconColorClass: 'text-purple-500',
        borderColor: 'border-purple-400',
    },
    {
        icon: <CreditCardOutlined />,
        title: 'Thanh toán tự động',
        desc: 'Thanh toán qua ví điện tử, thẻ, hoặc QR code nhanh chóng.',
        bgClass: 'bg-orange-100 bg-opacity-30 backdrop-blur-md',
        iconColorClass: 'text-orange-500',
        borderColor: 'border-orange-400',
    },
];

const Features = () => {
    const { theme } = useTheme();
    const bgClass1 = theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-green-50';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const bgClassDark = 'bg-gray-800 bg-opacity-80';
    const bgClassLight = 'bg-white bg-opacity-60';

    return (
        <section className={`py-16 ${bgClass1}`}>
            <div className="container mx-auto px-4 text-center max-w-6xl">
                <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${textClass}`}>Tính năng nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-xl border ${feature.borderColor} shadow-lg hover:shadow-2xl hover:scale-105 hover:translate-y-3 transition-all duration-300 
                            ${theme === 'dark' ? bgClassDark : bgClassLight}`}
                        >
                            <div className={`flex justify-center mb-4 transition-all duration-300 transform hover:scale-125 hover:rotate-6 
                            ${theme === 'dark' ? 'text-white' : feature.iconColorClass}`}>
                                {React.cloneElement(feature.icon, { className: `text-4xl ${theme === 'dark' ? 'text-gray-300' : feature.iconColorClass}` })}
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${textClass}`}>{feature.title}</h3>
                            <p className={`text-gray-600 ${textClass}`}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
