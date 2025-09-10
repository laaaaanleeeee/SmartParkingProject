import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useTheme } from "../hooks/useTheme";
import {
  getAllNews,
  getNewsById,
  getNewsByCategory,
} from "../services/NewsService";
import { FloatButton } from "antd";

const NewsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [newestNews, setNewestNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [promoNews, setPromoNews] = useState([]);
  const [updateNews, setUpdateNews] = useState([]);
  const [otherNews, setOtherNews] = useState([]);

  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newest = await getAllNews();
        const tech = await getNewsByCategory("TECHNOLOGY");
        const promo = await getNewsByCategory("PROMOTION");
        const update = await getNewsByCategory("UPDATE");
        const other = await getNewsByCategory("OTHER");

        setNewestNews(newest.data.listDTO || []);
        setTechNews(tech.data || []);
        setPromoNews(promo.data || []);
        setUpdateNews(update.data || []);
        setOtherNews(other.data || []);
      } catch (err) {
        console.error("Lỗi fetch data: ", err);
        message.error("Không thể tải tin tức. Vui lòng thử lại sau!");
      }
    };
    fetchNews();
  }, []);

  const handleViewDetail = async (id) => {
    try {
      const res = await getNewsById(id);
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

  const Section = ({ title, items }) => (
    <div className="mb-10">
      <h3
        className={`text-2xl font-bold mb-4 ${
          isDark ? "text-white" : "text-green-600"
        }`}
      >
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="text-gray-500">Không có tin tức nào.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {items.map((item) => (
            <div
              key={item.id}
              className={`min-w-[280px] max-w-[280px] flex-shrink-0 rounded-xl shadow-md transition cursor-pointer 
              ${
                isDark
                  ? "bg-gray-700 text-white hover:shadow-lg"
                  : "bg-white text-black border border-gray-200 hover:border-green-400"
              }`}
            >
              <div className="p-4">
                <h4 className="text-lg font-semibold line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                  {item.content}
                </p>
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
    </div>
  );

  return (
    <div>
      <div className="py-20 text-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Tin tức
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Cập nhật các tin tức mới nhất, công nghệ, khuyến mãi và thông tin bãi
          đỗ xe từ hệ thống Smart Parking.
        </p>
      </div>

      <div className="space-y-32 py-20 max-w-7xl mx-auto px-6">
        <Section title="Tin tức mới nhất" items={newestNews} />
        <Section title="Tin tức công nghệ" items={techNews} />
        <Section title="Tin tức khuyến mãi" items={promoNews} />
        <Section title="Tin tức cập nhật bãi đỗ" items={updateNews} />
        <Section title="Tin tức khác" items={otherNews} />
      </div>

      <Modal
        title={
          <span className="text-black font-bold">{selectedNews?.title}</span>
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
            <p className="text-sm mb-2 text-gray-700">
              Đăng bởi: {selectedNews.postedBy.fullName} (
              {selectedNews.postedBy.username})
            </p>
            <p className="text-sm mb-4 text-gray-600">
              Ngày đăng:{" "}
              {format(new Date(selectedNews.postedAt), "dd/MM/yyyy HH:mm", {
                locale: vi,
              })}
            </p>
            <p>{selectedNews.content}</p>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </Modal>

      <FloatButton.BackTop />
    </div>
  );
};

export default NewsPage;
