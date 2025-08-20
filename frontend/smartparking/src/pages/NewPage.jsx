import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useTheme } from "../hooks/useTheme";
import { getAllNews, getNewById } from "../services/NewService";

const NewsPage = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await getAllNews();
                setNews(res.data);
            } catch (err) {
                console.error("Lỗi fetch data: ", err);
                message.error("Không thể tải tin tức. Vui lòng thử lại sau!");
            }
        };
        fetchNews();
    }, []);

    const handleViewDetail = async (id) => {
        try {
            const res = await getNewById(id);
            setSelectedNews(res.data);
            setIsModalVisible(true);
        } catch (err) {
            console.error("Lỗi fetch chi tiết tin tức: ", err);
            message.error("Không thể tải chi tiết tin tức!");
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedNews(null);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-green-600"}`}>
                Tin tức mới nhất
            </h2>

            {news.length === 0 ? (
                <p className="text-center text-gray-500">Không có tin tức nào.</p>
            ) : (
                <div className="space-y-6">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center rounded-xl overflow-hidden shadow-sm transition 
                                ${isDark
                                    ? "bg-gray-600 text-white"
                                    : "bg-white text-black border border-gray-200 hover:border-green-400"
                                }`}
                        >
                            <div className="p-4 flex-1">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">{item.content}</p>
                                <div className="mt-3">
                                    <Button
                                        size="small"
                                        style={
                                            isDark
                                                ? {}
                                                : {
                                                    backgroundColor: "#22c55e",
                                                    borderColor: "#22c55e",
                                                    color: "#fff",
                                                }
                                        }
                                        onClick={() => handleViewDetail(item.id)}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                title={
                    <span className="text-black font-bold">
                        {selectedNews?.title}
                    </span>
                }
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedNews ? (
                    <div>
                        <p className={`text-sm mb-2 text-gray-700`}>
                            Đăng bởi: {selectedNews.postedBy.fullName} ({selectedNews.postedBy.username})
                        </p>
                        <p className={`text-sm mb-4 text-gray-600`}>
                            Ngày đăng: {format(new Date(selectedNews.postedAt), "dd/MM/yyyy HH:mm", { locale: vi })}
                        </p>
                        <p>{selectedNews.content}</p>
                    </div>
                ) : (
                    <p>Đang tải...</p>
                )}
            </Modal>
        </div>
    );
};

export default NewsPage;
