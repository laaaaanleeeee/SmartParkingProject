import React from 'react';
import { Link } from 'react-scroll';
import ImgBg1 from '@/assets/parkinglotimg.jpg';
import ImgBg2 from '@/assets/parkinglotimg2.jpg';
import ImgBg3 from '@/assets/parkinglotimg3.jpg';
import { Carousel } from 'antd';

const HeroSection = () => {
    return (
        <section className="relative h-[85vh] overflow-hidden">
            <Carousel autoplay effect="fade" className="h-full">
                {[ImgBg1, ImgBg2, ImgBg3].map((img, idx) => (
                    <div key={idx} className="relative h-[85vh]">
                        <img
                            src={img}
                            alt="Smart Parking"
                            className="w-full h-full object-cover brightness-50 transform transition-transform duration-1000 hover:scale-110"
                        />
                    </div>
                ))}
            </Carousel>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg animate-fade-in text-green-500">
                    Smart Park
                </h1>
                <p className='text-3xl md:text-5xl font-bold drop-shadow-lg animate-fade-in mb-4'>Đỗ xe thông minh, tương lai bền vững</p>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 font-semibold">
                    Tìm chỗ đỗ nhanh chóng, an toàn và tiện lợi với công nghệ tự động nhận diện biển số và quản lý thời gian thực.
                </p>
                <Link to="benefits" smooth duration={600}>
                    <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition cursor-pointer">
                        BẮT ĐẦU
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
