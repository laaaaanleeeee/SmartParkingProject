import React from 'react';
import { Timeline } from 'antd';
import { useTheme } from '@/hooks/useTheme';

const HowItWorks = () => {
    const { theme } = useTheme();
    const bgClass2 = theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-r from-green-100 to-blue-100';
    const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    
    return (
        <section className={`py-16 ${bgClass2} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 50,100" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${textClass}`}>
            Quy trình hoạt động
          </h2>
          <Timeline
            mode="alternate"
            items={[
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">1. Tìm chỗ đỗ</h3>
                    <p className="text-gray-600">Tìm bãi đỗ gần nhất qua web/app với bản đồ thời gian thực.</p>
                  </div>
                ),
                color: 'blue',
              },
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">2. Đặt chỗ</h3>
                    <p className="text-gray-600">Chọn vị trí và giữ chỗ trước, nhận xác nhận tức thì.</p>
                  </div>
                ),
                color: 'green',
              },
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">3. Vào bãi</h3>
                    <p className="text-gray-600">Camera nhận diện biển số, barrier tự động mở cho xe hợp lệ.</p>
                  </div>
                ),
                color: 'purple',
              },
              {
                children: (
                  <div className="p-4 bg-white bg-opacity-80 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">4. Rời bãi</h3>
                    <p className="text-gray-600">Thanh toán tự động, barrier mở, hệ thống cập nhật chỗ trống.</p>
                  </div>
                ),
                color: 'orange',
              },
            ]}
          />
        </div>
      </section>
    )
}

export default HowItWorks;
