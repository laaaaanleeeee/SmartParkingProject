import React from 'react';
import Img1 from '../assets/camera.jpg';
import Img2 from '../assets/barrier.png';
import Img3 from '../assets/ovs.jpg';
import Img4 from '../assets/webapp.jpg';
import { useTheme } from '../hooks/useTheme';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import Atropos from "atropos/react";

const hardware = [
  { img: Img1, title: 'Camera ANPR' },
  { img: Img2, title: 'Barrier thông minh' },
  { img: Img3, title: 'Cảm biến IoT' },
  { img: Img4, title: 'Ứng dụng quản lý' },
];

const SystemSimulation = () => {
  const { theme } = useTheme();
  const bgClass1 = theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-blue-50 to-green-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <section className={`py-20 ${bgClass1}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className={`text-3xl md:text-4xl font-extrabold mb-16 text-center ${textClass}`}>
          Mô phỏng hệ thống
        </h2>

        <div className="space-y-20">
          {hardware.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/2 flex justify-center items-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-center text-green-500">
                  {item.title}
                </h3>
              </div>

              <div className="md:w-1/2">
                <Atropos
                  className="rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105"
                  rotateXMax={20}
                  rotateYMax={20}
                  shadow={true}
                  highlight={true}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className={`rounded-xl shadow-lg w-full h-64 object-cover transition-transform duration-300 ${bgClass1}`}
                  />
                </Atropos>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <NavLink to="/technologies">
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              TÌM HIỂU THÊM
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SystemSimulation;
