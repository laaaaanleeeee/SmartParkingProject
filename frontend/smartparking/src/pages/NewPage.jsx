import React, { useEffect, useState } from "react";
import { Button, message, Modal, Tabs, FloatButton } from "antd";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useTheme } from "../hooks/useTheme";
import {
  getAllNews,
  getNewsById,
  getNewsByCategory,
} from "../services/NewsService";
import Img1 from "../assets/parkinglotimg.jpg";

const NewsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [newestNews, setNewestNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [promoNews, setPromoNews] = useState([]);
  const [updateNews, setUpdateNews] = useState([]);
  const [otherNews, setOtherNews] = useState([]);

  const [activeKey, setActiveKey] = useState("tech");

  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sectionBg = isDark
    ? "bg-gray-900"
    : "bg-gradient-to-br from-blue-50 via-green-50 to-blue-100";

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

  const HeroSection = () => {
    if (newestNews.length === 0) return null;
    const [main, ...others] = newestNews.slice(0, 3);

    return (
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div
          onClick={() => handleViewDetail(main.id)}
          className="md:col-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
        >
          <img
            src={Img1}
            alt={main.title}
            className="w-full h-96 object-cover group-hover:scale-105 transition"
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {main.title}
            </h2>
            <p className="text-gray-200 mt-2 line-clamp-3">{main.content}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {others.map((item) => (
            <div
              key={item.id}
              onClick={() => handleViewDetail(item.id)}
              className={`flex gap-4 items-center rounded-lg overflow-hidden shadow-md cursor-pointer group ${isDark ? "bg-gray-800 text-white" : "bg-white"
                }`}
            >
              <img
                src={Img1}
                alt={item.title}
                className="w-28 h-28 object-cover"
              />
              <div className="p-2">
                <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-green-600">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(item.postedAt), "dd/MM/yyyy", { locale: vi })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Section = ({ items }) => (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleViewDetail(item.id)}
          className={`rounded-xl overflow-hidden shadow-md cursor-pointer group 
            ${isDark ? "bg-gray-800 text-white" : "bg-white"}
            transition transform hover:-translate-y-1 hover:shadow-xl`}
        >
          <img
            src={Img1}
            alt={item.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition"
          />
          <div className="p-4">
            <h4 className="text-lg font-semibold line-clamp-2 group-hover:text-green-500">
              {item.title}
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              {format(new Date(item.postedAt), "dd/MM/yyyy", { locale: vi })}
            </p>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLabel = (key, text) => {
    const isActive = activeKey === key;
    return (
      <span
        className={
          isActive
            ? `${isDark ? "text-blue-400" : "text-blue-600"} font-semibold`
            : `${isDark ? "text-gray-400" : "text-gray-500"}`
        }
      >
        {text}
      </span>
    );
  };

  return (
    <div className={`${sectionBg}`}>
      <div className="py-20 text-center bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Tin tức
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          Cập nhật các tin tức mới nhất, công nghệ, khuyến mãi và thông tin bãi
          đỗ xe từ hệ thống Smart Parking.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <HeroSection />

        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          centered
          items={[
            { key: "tech", label: renderLabel("tech", "Công nghệ"), children: <Section items={techNews} /> },
            { key: "promo", label: renderLabel("promo", "Khuyến mãi"), children: <Section items={promoNews} /> },
            { key: "update", label: renderLabel("update", "Cập nhật bãi đỗ"), children: <Section items={updateNews} /> },
            { key: "other", label: renderLabel("other", "Khác"), children: <Section items={otherNews} /> },
          ]}
        />
      </div>

      <Modal
        title={<span className="text-black font-bold">{selectedNews?.title}</span>}
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
