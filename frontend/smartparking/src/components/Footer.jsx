import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/S.png';

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link to="/" className="flex items-center mb-4">
                        <img src={Logo} alt="Logo" className="w-10 h-auto mr-2" />
                        <span className="text-xl font-semibold">Smart Parking</span>
                    </Link>
                    <p className="text-sm text-gray-400">
                        Ứng dụng hỗ trợ tìm và đặt chỗ đỗ xe nhanh chóng, an toàn và tiện lợi.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/" className="hover:text-white">Trang chủ</Link></li>
                        <li><Link to="/menu" className="hover:text-white">Giới thiệu</Link></li>
                        <li><Link to="/about" className="hover:text-white">Tin tức</Link></li>
                        <li><Link to="/news" className="hover:text-white">Bản đồ bãi đỗ</Link></li>
                        <li><Link to="/booking" className="hover:text-white">Đặt chỗ ngay</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                        <li><a href="#" className="hover:text-white">Điều khoản dịch vụ</a></li>
                        <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
                        <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Email: lehailan110@gmail.com</li>
                        <li>Hotline: 0368063473</li>
                        <li>Địa chỉ: Tây Hồ, Hà Nội</li>
                    </ul>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Parking App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
