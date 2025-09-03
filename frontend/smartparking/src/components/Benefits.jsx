import React from 'react';
import { CarOutlined, SafetyOutlined, DashboardOutlined } from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';

const benefits = [
    {
        title: 'Tiết kiệm thời gian',
        desc: 'Tìm và đặt chỗ đỗ trong vài giây.',
        icon: <CarOutlined className="text-4xl text-blue-500" />,
        borderColor: 'border-blue-400',
    },
    {
        title: 'Thân thiện môi trường',
        desc: 'Giảm khí thải, tối ưu lộ trình đỗ xe.',
        icon: <SafetyOutlined className="text-4xl text-green-500" />,
        borderColor: 'border-green-400',
    },
    {
        title: 'Tăng hiệu quả quản lý',
        desc: 'Tự động hóa quy trình, giảm chi phí.',
        icon: <DashboardOutlined className="text-4xl text-purple-500" />,
        borderColor: 'border-purple-400',
    },
];

const Benefits = () => {
    const { theme } = useTheme();
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const bgClass1 = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const bgClass2 = theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-50 to-green-50';

    return (
        <section id="benefits" className={`py-16 ${bgClass2}`}>
            <div className="container mx-auto px-4 text-center max-w-5xl">
                <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${textClass}`}>
                    Lợi ích của <span className="text-green-500">Smart Park</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-xl border-2 ${item.borderColor} bg-opacity-80 hover:rotate-2 transition-transform duration-300 ${bgClass1}`}
                        >
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-md text-black">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
