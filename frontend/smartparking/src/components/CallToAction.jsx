import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const CallToAction = () => {
    const { theme } = useTheme();
    const bgClass1 = theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-50 to-green-50';

    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    return (
        <section className={`py-16 ${bgClass1} text-center`}>
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 ${textClass}`}>
                    Bạn muốn nâng cấp bãi đỗ?
                </h2>
                <p className="text-gray-600 mb-6">
                    Hãy liên hệ ngay để được tư vấn miễn phí triển khai giải pháp Smart Park cho bãi đỗ xe của bạn.
                </p>
                <NavLink to="/contact">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg transition">
                        LIÊN HỆ NGAY
                    </button>
                </NavLink>
            </div>
        </section>
    )
}

export default CallToAction;
