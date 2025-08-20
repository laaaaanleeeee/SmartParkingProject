import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select, Slider, Rate, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { getAllParkingLot } from "../services/ParkingLotService";
import ImgBg1 from "../assets/parkinglotimg.jpg";

const { Option } = Select;

const ParkingLotPage = () => {
    const { theme } = useTheme();
    const bgClass = theme === "dark" ? "bg-gray-600 text-white" : "bg-white text-black";
    const [parkingLots, setParkingLots] = useState([]);
    const [filteredParkingLots, setFilteredParkingLots] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState(null);
    const [priceFilter, setPriceFilter] = useState([0, 50000]);
    const [slotsFilter, setSlotsFilter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParkingLots = async () => {
            try {
                const res = await getAllParkingLot();
                setParkingLots(res.data);
                setFilteredParkingLots(res.data);
            } catch (err) {
                console.error("Lỗi fetch bãi đỗ: ", err);
                message.error("Không thể tải danh sách bãi đỗ!");
            }
        };
        fetchParkingLots();
    }, []);

    useEffect(() => {
        let filtered = parkingLots;

        if (searchName) {
            filtered = filtered.filter((lot) =>
                lot.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (cityFilter) {
            filtered = filtered.filter((lot) =>
                lot.address.toLowerCase().includes(cityFilter.toLowerCase())
            );
        }

        if (districtFilter) {
            filtered = filtered.filter((lot) =>
                lot.address.toLowerCase().includes(districtFilter.toLowerCase())
            );
        }

        if (ratingFilter) {
            filtered = filtered.filter((lot) => {
                const avgRating =
                    lot.reviews.length > 0
                        ? lot.reviews.reduce((sum, r) => sum + r.rating, 0) / lot.reviews.length
                        : 0;
                return avgRating >= ratingFilter;
            });
        }

        filtered = filtered.filter((lot) => {
            const minPrice =
                lot.pricings.length > 0
                    ? Math.min(...lot.pricings.map((p) => p.pricePerHour))
                    : Infinity;
            return minPrice >= priceFilter[0] && minPrice <= priceFilter[1];
        });

        if (slotsFilter !== null) {
            filtered = filtered.filter((lot) => lot.availableSlots >= slotsFilter);
        }

        setFilteredParkingLots(filtered);
    }, [searchName, cityFilter, districtFilter, ratingFilter, priceFilter, slotsFilter, parkingLots]);

    const getAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    };

    const getMinPrice = (pricings) => {
        if (pricings.length === 0) return "Chưa có giá";
        return Math.min(...pricings.map((p) => p.pricePerHour)).toLocaleString("vi-VN") + " VNĐ/giờ";
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Danh sách bãi đỗ xe</h2>

            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Tìm kiếm theo tên bãi đỗ"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <Select
                        placeholder="Chọn thành phố"
                        allowClear
                        onChange={(value) => setCityFilter(value || "")}
                        className="w-full"
                    >
                        <Option value="Hà Nội">Hà Nội</Option>
                    </Select>
                    <Select
                        placeholder="Chọn phường"
                        allowClear
                        onChange={(value) => setDistrictFilter(value || "")}
                        className="w-full"
                    >
                        <Option value="Đống Đa">Đống Đa</Option>
                        <Option value="Cầu Giấy">Cầu Giấy</Option>
                        <Option value="Ba Đình">Ba Đình</Option>
                    </Select>
                    <Select
                        placeholder="Đánh giá tối thiểu"
                        allowClear
                        onChange={(value) => setRatingFilter(value || null)}
                        className="w-full"
                    >
                        <Option value={1}>1 sao</Option>
                        <Option value={2}>2 sao</Option>
                        <Option value={3}>3 sao</Option>
                        <Option value={4}>4 sao</Option>
                        <Option value={5}>5 sao</Option>
                    </Select>
                    <div>
                        <label>Khoảng giá (VNĐ/giờ):</label>
                        <Slider
                            range
                            min={0}
                            max={50000}
                            step={1000}
                            defaultValue={[0, 50000]}
                            onChange={(value) => setPriceFilter(value)}
                        />
                    </div>
                    <Input
                        type="number"
                        placeholder="Số chỗ trống tối thiểu"
                        onChange={(e) => setSlotsFilter(e.target.value ? Number(e.target.value) : null)}
                    />
                </div>
            </div>

            {filteredParkingLots.length === 0 ? (
                <p className="text-center text-gray-500">Không tìm thấy bãi đỗ nào.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredParkingLots.map((lot) => (
                        <Card
                            key={lot.id}
                            hoverable
                            cover={
                                <img
                                    alt={lot.name}
                                    src={lot.images.length > 0 ? lot.images[0].url : ImgBg1}
                                    className="h-48 object-cover"
                                />
                            }
                            className={bgClass}
                        >
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{lot.name}</h3>
                                <p className="text-sm">{lot.address}</p>
                                <div className="text-sm mt-2">
                                    <span>Đánh giá: </span>
                                    <Rate disabled allowHalf value={getAverageRating(lot.reviews)} />
                                    <span> ({lot.reviews.length} đánh giá)</span>
                                </div>
                                <p className="text-sm">Giá: {getMinPrice(lot.pricings)}</p>
                                <p className="text-sm">Số chỗ trống: {lot.availableSlots}/{lot.totalSlots}</p>
                                <Button
                                    type="primary"
                                    className="mt-4"
                                    onClick={() => navigate(`/parking-lots/${lot.id}`)}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ParkingLotPage;