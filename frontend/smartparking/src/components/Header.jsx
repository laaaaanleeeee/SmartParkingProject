import React, { useEffect, useState } from 'react';
import { useTheme } from "../hooks/useTheme";
import { NavLink, useNavigate } from "react-router-dom";
import { Switch, Dropdown, message, Drawer, Button } from 'antd';
import { MoonOutlined, SunOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '../assets/S.png';
import { useAuth } from "../hooks/useAuth";
import { getAllParkingLot } from "../services/ParkingLotService"; 
import ImgBg1 from "../assets/errorImg.jpg";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    const accountItems = [
        { label: "Thông tin cá nhân", key: '1' },
        { label: <NavLink to="/user/history">Lịch sử đặt chỗ</NavLink>, key: '3' },
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
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchValue.trim() === "") {
                setSearchResult([]);
                return;
            }

            getAllParkingLot({ name: searchValue, page: 0, size: 5 })
                .then(res => {
                    setSearchResult(res.data.listDTO || []);
                })
                .catch(() => {
                    message.error("Lỗi khi tìm kiếm bãi đỗ");
                    setSearchResult([]);
                });
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchValue]);

    return (
        <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} shadow-md`}>
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-10">
                    <NavLink to="/" className="flex items-center space-x-2">
                        <img src={Logo} alt="Logo" className="w-10 h-auto" />
                    </NavLink>
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink to="/solutions" className="hover:text-green-600">Giải pháp</NavLink>
                        <NavLink to="/technologies" className="hover:text-green-600">Công nghệ</NavLink>
                        <NavLink to="/news" className="hover:text-green-600">Tin tức</NavLink>
                        <NavLink to="/contact" className="hover:text-green-600">Liên hệ</NavLink>
                        <NavLink to="/parking_lots">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                Đặt chỗ ngay
                            </button>
                        </NavLink>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-6 ml-auto relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Tìm bãi đỗ xe..."
                            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <SearchOutlined />
                        </span>

                        {searchResult.length > 0 && (
                            <ul className="absolute top-full left-0 mt-2 z-50 bg-white shadow-lg rounded w-72 max-h-72 overflow-y-auto">
                                {searchResult.map((lot) => (
                                    <li
                                        key={lot.id}
                                        className="p-2 border-b cursor-pointer hover:bg-green-100 flex"
                                        onClick={() => {
                                            navigate(`/parking_lots/${lot.id}`);
                                            setSearchResult([]);
                                            setSearchValue("");
                                        }}
                                    >
                                        <img
                                            src={lot.images?.length > 0 ? lot.images[0].url : ImgBg1}
                                            alt={lot.name}
                                            className="w-14 h-14 object-cover rounded mr-2"
                                        />
                                        <div>
                                            <p className="font-semibold">{lot.name}</p>
                                            <p className="text-sm text-gray-500">{lot.address}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Dropdown menu={{ items: accountItems, onClick }} placement="bottomRight" arrow>
                        <div className="cursor-pointer hover:text-green-600">Tài khoản</div>
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
                    <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} className="text-xl" />
                </div>
            </div>

            <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                width={250}
                open={open}
            >
            </Drawer>
        </header>
    );
};

export default Header;
