import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Carousel, Spin, Empty } from "antd";
import { getAllNews } from "@/services/NewsService";
import Img1 from '@/assets/parkinglotimg.jpg';

const NewsEvents = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const sectionBg = isDark
    ? "bg-gray-800"
    : "bg-gradient-to-r from-green-100 to-blue-100";
  const descColor = isDark ? "text-gray-300" : "text-gray-600";

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNews({ page: 0, size: 6 })
      .then((res) => {
        setNews(res.data.listDTO || []);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={`py-20 ${sectionBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${textColor}`}
        >
          Tin tức & Sự kiện
        </h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : news.length === 0 ? (
          <Empty description="Chưa có tin tức nào" />
        ) : (
          <Carousel
            autoplay
            dots={true}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2 } },
              { breakpoint: 768, settings: { slidesToShow: 1 } },
            ]}
          >
            {news.map((item, idx) => (
              <div key={idx} className="px-3">
                <div
                  className={`rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 ${cardBg}`}
                >
                  <img
                    src={Img1}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-5">
                    <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm mb-4 ${descColor}`}>
                      {item.description}
                    </p>
                    <NavLink to={`/news`}>
                      <span className="inline-block text-sm text-blue-500 hover:text-blue-600 transition-colors">
                        Xem chi tiết →
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default NewsEvents;
