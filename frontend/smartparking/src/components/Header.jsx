import React from 'react';
import { useTheme } from "../hooks/useTheme";
import { NavLink } from "react-router-dom";
import { Switch, Dropdown } from 'antd';
import { MoonOutlined, SunOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import Logo from '../assets/S.png';

const accountItems = [
    { label: 'Thông tin cá nhân', key: '1' },
    { label: 'Gói hội viên', key: '2' },
    { label: 'Lịch sử đặt chỗ', key: '3' },
    { label: 'Thông báo', key: '4' },
    { label: 'Đăng xuất', key: '5' },
];

const Header = () => {
    const { theme, setTheme } = useTheme();

    return (
        <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md`}>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-10">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="w-10 h-auto" />
                    </NavLink>


                </div>

                <div className="flex items-center space-x-6">
                    <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 w-48"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <SearchOutlined />
                            </span>
                        </div>
                        <NavLink
                            to="/parking_lots"
                        >
                            <div className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                                <span>Các bãi đỗ xe</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/news"
                        >
                            <div className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                                <span>Tin tức</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/contact"
                        >
                            <div className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                                <span>Liên hệ</span>
                            </div>
                        </NavLink>
                        <Dropdown menu={{ items: accountItems }} placement="bottomRight" arrow>
                            <div className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                                <span>Tài khoản</span>
                            </div>
                        </Dropdown>
                        <NavLink to="/booking">
                            <button className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                                Đặt chỗ ngay
                            </button>
                        </NavLink>
                        <Switch
                            checked={theme === 'dark'}
                            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            checkedChildren={<MoonOutlined />}
                            unCheckedChildren={<SunOutlined />}
                            className="bg-gray-300"
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
