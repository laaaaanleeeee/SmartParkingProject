import React from "react";
import { NavLink } from "react-router-dom";

const ParkingLotDetailPage = () => {
    const parkingLot = {
        id: 1,
        name: "Bãi đỗ xe Trung tâm TP",
        address: "123 Đường A, Quận B, TP.HCM",
        price: "10.000đ/giờ",
        available: 25,
        services: ["Camera giám sát", "Bảo vệ 24/7", "Rửa xe"],
        image:
            "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80",
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={parkingLot.image}
                        alt={parkingLot.name}
                        className="w-full h-80 object-cover rounded-xl shadow"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{parkingLot.name}</h1>
                    <p className="text-gray-600">{parkingLot.address}</p>
                    <p className="text-lg font-semibold text-blue-600">
                        Giá: {parkingLot.price}
                    </p>
                    <p>
                        <span className="font-semibold">Số chỗ trống:</span>{" "}
                        {parkingLot.available}
                    </p>
                    <div>
                        <h3 className="font-semibold mb-2">Dịch vụ:</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            {parkingLot.services.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                    <NavLink to="/parking_lots/id/booking">
                        <button className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                            Đặt chỗ
                        </button>
                    </NavLink>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Vị trí bãi đỗ xe</h2>
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502351197796!2d106.70042341526053!3d10.776530062140019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f469646b2b1%3A0xd3d8cb3ddc57b8e!2zQ8O0bmcgVmllbiBUaMOgbmg!5e0!3m2!1svi!2s!4v1633781341462!5m2!1svi!2s"
                    width="100%"
                    height="400"
                    allowFullScreen=""
                    loading="lazy"
                    className="rounded-lg shadow"
                ></iframe>
            </div>
        </div>
    );
};

export default ParkingLotDetailPage;
