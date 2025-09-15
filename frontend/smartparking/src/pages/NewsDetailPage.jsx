import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "../services/NewsService";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { FloatButton } from "antd";
import Img1 from "../assets/parkinglotimg.jpg";
import { useTheme } from "../hooks/useTheme";

const NewsDetailPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

    const sectionBg = theme === "dark"
        ? "bg-gray-900"
        : "bg-white";

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getNewsById(id);
                setNews(res.data);
            } catch (err) {
                console.error("Lỗi tải chi tiết tin tức:", err);
            }
        };
        fetchNews();
    }, [id]);

    if (!news) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500 animate-pulse">Đang tải tin tức...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 ">
            <div className="py-16 text-center bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
                    {news.title}
                </h1>
                <p className="text-sm opacity-90">
                    Đăng bởi <span className="font-semibold">{news.postedBy.fullName}</span> (
                    {news.postedBy.username}) •{" "}
                    {format(new Date(news.postedAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                </p>
            </div>

            <div className={`max-w-4xl mx-auto px-6 py-12 shadow-lg rounded-xl mt-[-60px] relative z-10 ${sectionBg}`}>
                <img
                    src={news.imageUrl || Img1}
                    alt={news.title}
                    className="w-full h-80 object-cover rounded-xl shadow-md mb-8"
                />

                <div className="prose lg:prose-lg dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line leading-relaxed">{news.content}</p>
                </div>

                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
                    >
                        ← Quay lại
                    </button>
                </div>
            </div>

            <FloatButton.BackTop />
        </div>
    );
};

export default NewsDetailPage;
