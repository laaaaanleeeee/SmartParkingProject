import React, { useState } from 'react';
import { useTheme } from "../hooks/useTheme";
import { NavLink, useNavigate } from "react-router-dom";
import { Switch, Dropdown, message, Drawer, Button } from 'antd';
import { MoonOutlined, SunOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '../assets/S.png';
import { useAuth } from "../hooks/useAuth";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const accountItems = [
        { label: "Thông tin cá nhân", key: '1' },
        { label: <NavLink to="/subcription">Gói hội viên</NavLink>, key: '2' },
        { label: <NavLink to="/history_booking">Lịch sử đặt chỗ</NavLink>, key: '3' },
        { label: 'Thông báo', key: '4' },
        { label: 'Đăng xuất', key: '5' },
    ];

    const onClick = ({ key }) => {
        switch (key) {
            case '1':
                navigate('/user');
                break;
            case '5':
                logout();
                message.success("Đăng xuất thành công");
        }
    };

    return (
        <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md`}>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                <div className="flex items-center space-x-10">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="w-10 h-auto" />
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to="/solutions" className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                            <span>Giải pháp</span>
                        </NavLink>
                        <NavLink to="/technologies" className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                            <span>Công nghệ</span>
                        </NavLink>
                        <NavLink to="/news" className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                            <span>Tin tức</span>
                        </NavLink>
                        <NavLink to="/contact" className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                            <span>Liên hệ</span>
                        </NavLink>
                        <NavLink to="/parking-lots">
                            <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                                Đặt chỗ ngay
                            </button>
                        </NavLink>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-6 ml-auto">
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

                    <Dropdown menu={{ items: accountItems, onClick }} placement="bottomRight" arrow>
                        <div className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                            <span>Tài khoản</span>
                        </div>
                    </Dropdown>

                    <Switch
                        checked={theme === 'dark'}
                        onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        checkedChildren={<MoonOutlined />}
                        unCheckedChildren={<SunOutlined />}
                        className="bg-gray-300"
                    />
                </div>

                <div className="md:hidden ml-auto">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={showDrawer}
                        className="text-xl"
                    />
                </div>
            </div>

            <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={onClose}
                width={250}
                open={open}
            >
                <NavLink to="/solutions" className="block py-2">Giải pháp</NavLink>
                <NavLink to="/technologies" className="block py-2">Công nghệ</NavLink>
                <NavLink to="/news" className="block py-2">Tin tức</NavLink>
                <NavLink to="/contact" className="block py-2">Liên hệ</NavLink>
                <NavLink to="/parking-lots" className="block py-2">
                    <button className="cursor-pointer bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors w-full">
                        Đặt chỗ ngay
                    </button>
                </NavLink>
                <div className="mt-4">
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 w-full"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <SearchOutlined />
                        </span>
                    </div>

                    <Dropdown menu={{ items: accountItems, onClick }} placement="bottomRight" arrow>
                        <div className="cursor-pointer flex items-center hover:text-green-600 transition-colors">
                            <span>Tài khoản</span>
                        </div>
                    </Dropdown>

                    <div className="flex items-center justify-between mt-4">
                        <span>Chế độ tối:</span>
                        <Switch
                            checked={theme === 'dark'}
                            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            checkedChildren={<MoonOutlined />}
                            unCheckedChildren={<SunOutlined />}
                        />
                    </div>
                </div>
            </Drawer>
        </header>

    );
};

export default Header;
