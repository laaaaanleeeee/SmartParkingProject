import React from "react";
import { Button } from "antd";
import ImgBg1 from '../assets/parkinglotimg.jpg';
import { useTheme } from "../hooks/useTheme";

const NewsPage = () => {
    const { theme } = useTheme();
    const bgClass3 = theme === 'dark' ? 'bg-gray-600' : 'bg-white';

    const news = [
        {
            id: 1,
            title: "Smart Parking triển khai ở Hà Nội",
            desc: "Hệ thống bãi đỗ xe thông minh giúp giảm ùn tắc và tối ưu diện tích đỗ xe.",
            date: "18/08/2025",
            image: `${ImgBg1}`
        },
        {
            id: 2,
            title: "Ứng dụng AI trong quản lý bãi đỗ",
            desc: "AI giúp phát hiện chỗ trống nhanh chóng và tăng hiệu suất vận hành.",
            date: "19/08/2025",
            image: `${ImgBg1}`
        },
        {
            id: 3,
            title: "Smart Parking mở rộng ở TP.HCM",
            desc: "Mô hình được áp dụng rộng rãi tại các trung tâm thương mại và khu đô thị.",
            date: "20/08/2025",
            image: `${ImgBg1}`
        },
        {
            id: 4,
            title: "Smart Parking mở rộng ở TP.HCM",
            desc: "Mô hình được áp dụng rộng rãi tại các trung tâm thương mại và khu đô thị.",
            date: "20/08/2025",
            image: `${ImgBg1}`
        },
        {
            id: 5,
            title: "Smart Parking mở rộng ở TP.HCM",
            desc: "Mô hình được áp dụng rộng rãi tại các trung tâm thương mại và khu đô thị.",
            date: "20/08/2025",
            image: `${ImgBg1}`
        },
        {
            id: 6,
            title: "Smart Parking mở rộng ở TP.HCM",
            desc: "Mô hình được áp dụng rộng rãi tại các trung tâm thương mại và khu đô thị.",
            date: "20/08/2025",
            image: `${ImgBg1}`
        },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Tin tức mới nhất</h2>
            <div className="space-y-6">
                {news.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center ${bgClass3} shadow-md rounded-xl overflow-hidden hover:shadow-lg transition`}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-40 h-28 object-cover"
                        />
                        <div className="p-4 flex-1">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className=" text-sm mt-1">{item.desc}</p>
                            <span className="text-xs mt-2 block">
                                {item.date}
                            </span>
                            <div className="mt-3">
                                <Button type="primary" size="small">
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
