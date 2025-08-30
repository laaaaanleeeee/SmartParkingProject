import React, { useEffect, useState } from 'react';
import { Input, Select, Slider, Rate, message, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { getAllParkingLot } from '../services/ParkingLotService';
import ImgBg1 from '../assets/errorImg.jpg';
import axios from 'axios';
import { FloatButton } from 'antd';

const { Option } = Select;

const ParkingLotPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const textClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const cardClass =
        theme === 'dark'
            ? 'bg-gray-900 text-gray-100 border border-gray-700'
            : 'bg-white text-gray-900 border border-gray-200';
    const filterClass =
        theme === 'dark'
            ? 'bg-gray-800 text-gray-100 border border-gray-700'
            : 'bg-white text-gray-900 border border-gray-200';

    const [cities, setCities] = useState([]);
    const [wards, setWards] = useState([]);
    const [parkingLots, setParkingLots] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        totalPage: 0,
        size: 10,
        totalElement: 0,
        isFirst: true,
        isLast: false,
    });
    const [filters, setFilters] = useState({
        name: '',
        city: '',
        ward: '',
        minPrice: 0,
        maxPrice: 500000,
        minRating: null,
        minSlots: null,
    });

    useEffect(() => {
        const fetchCityandWard = async () => {
            try {
                const res = await axios.get('https://provinces.open-api.vn/api/v2/?depth=2');
                setCities(res.data);
            } catch (err) {
                console.error('Lỗi fetch tỉnh/thành phố:', err);
                message.error('Không thể tải danh sách tỉnh/thành phố!');
            }
        };
        fetchCityandWard();
    }, []);

    useEffect(() => {
        const fetchParkingLots = async () => {
            try {
                const res = await getAllParkingLot({
                    ...filters,
                    page: pagination.page,
                    size: pagination.size,
                });
                setParkingLots(res.data.listDTO);
                setPagination({
                    page: res.data.page,
                    totalPage: res.data.totalPage,
                    size: res.data.size,
                    totalElement: res.data.totalElement,
                    isFirst: res.data.isFirst,
                    isLast: res.data.isLast,
                });
            } catch (err) {
                console.error('Lỗi fetch bãi đỗ:', err);
                message.error('Không thể tải danh sách bãi đỗ!');
            }
        };
        fetchParkingLots();
    }, [filters, pagination.page, pagination.size]);

    const handleCityChange = (value) => {
        setFilters((prev) => ({ ...prev, city: value || '', ward: '' }));
        setPagination((prev) => ({ ...prev, page: 0 }));
        const selectedCity = cities.find((city) => city.name === value);
        if (selectedCity) {
            setWards(selectedCity.wards || []);
        } else {
            setWards([]);
        }
    };

    const handleWardChange = (value) => {
        setFilters((prev) => ({ ...prev, ward: value || '' }));
        setPagination((prev) => ({ ...prev, page: 0 }));
    };

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        setPagination((prev) => ({ ...prev, page: 0 }));
    };

    const getAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    };

    const getMinPrice = (pricings) => {
        if (pricings.length === 0) return 'Chưa có giá';
        return (
            Math.min(...pricings.map((p) => p.pricePerHour)).toLocaleString('vi-VN') + ' VNĐ/giờ'
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className={`text-3xl font-bold text-center mb-6 ${textClass}`}>
                Danh sách bãi đỗ xe
            </h2>

            <div className={`mb-6 p-4 rounded-xl shadow ${cardClass}`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Tìm kiếm theo tên bãi đỗ"
                        value={filters.name}
                        onChange={(e) => handleFilterChange('name', e.target.value)}
                        className={filterClass}
                    />
                    <Select
                        placeholder="Chọn thành phố"
                        allowClear
                        value={filters.city}
                        onChange={handleCityChange}
                        className={`w-full ${filterClass}`}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {cities.map((city) => (
                            <Option key={city.code} value={city.name}>
                                {city.name}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Chọn phường"
                        allowClear
                        value={filters.ward}
                        onChange={handleWardChange}
                        className={`w-full ${filterClass}`}
                        disabled={!filters.city}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {wards.map((ward) => (
                            <Option key={ward.code} value={ward.name}>
                                {ward.name}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Đánh giá tối thiểu"
                        allowClear
                        value={filters.minRating}
                        onChange={(value) => handleFilterChange('minRating', value || null)}
                        className={`w-full ${filterClass}`}
                    >
                        <Option value={1}>1 sao</Option>
                        <Option value={2}>2 sao</Option>
                        <Option value={3}>3 sao</Option>
                        <Option value={4}>4 sao</Option>
                        <Option value={5}>5 sao</Option>
                    </Select>
                    <div className={filterClass + " p-2 rounded"}>
                        <label className="block text-xs mb-1">Khoảng giá (VNĐ/giờ):</label>
                        <Slider
                            range
                            min={0}
                            max={50000}
                            step={1000}
                            value={[filters.minPrice, filters.maxPrice]}
                            onChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    minPrice: value[0],
                                    maxPrice: value[1],
                                }))
                            }
                        />
                    </div>
                    <Input
                        type="number"
                        placeholder="Số chỗ trống tối thiểu"
                        onChange={(e) =>
                            handleFilterChange(
                                'minSlots',
                                e.target.value ? Number(e.target.value) : null
                            )
                        }
                        className={filterClass}
                    />
                </div>
            </div>

            {parkingLots.length === 0 ? (
                <p className="text-center text-gray-500">Không tìm thấy bãi đỗ nào.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parkingLots.map((lot) => (
                        <div
                            key={lot.id}
                            className={`rounded-xl shadow-lg overflow-hidden ${cardClass} transition transform hover:scale-105`}
                        >
                            <img
                                alt={lot.name}
                                src={lot.images.length > 0 ? lot.images[0].url : ImgBg1}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{lot.name}</h3>
                                <p className="text-sm">{lot.address}</p>
                                <div className="flex items-center mt-2 text-sm">
                                    <Rate disabled allowHalf value={getAverageRating(lot.reviews)} />
                                    <span className="ml-1">({lot.reviews.length} đánh giá)</span>
                                </div>
                                <p className="text-sm mt-1">Giá: {getMinPrice(lot.pricings)}</p>
                                <p className="text-sm">
                                    Số chỗ trống: {lot.availableSlots}/{lot.totalSlots}
                                </p>
                                <button
                                    onClick={() => navigate(`/parking-lots/${lot.id}`)}
                                    className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 flex justify-center">
                <Pagination
                    current={pagination.page + 1}
                    total={pagination.totalElement}
                    pageSize={pagination.size}
                    onChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
                    showSizeChanger={false}
                />
            </div>

            <FloatButton.BackTop />
        </div>
    );
};

export default ParkingLotPage;
