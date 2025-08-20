import React from "react";

const SubscriptionPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "100,000đ / tháng",
      benefits: ["Đặt chỗ nhanh chóng", "Xem lịch sử đặt chỗ"],
    },
    {
      name: "Pro",
      price: "200,000đ / tháng",
      benefits: [
        "Tất cả quyền lợi Basic",
        "Ưu tiên khi đặt chỗ",
        "Giảm 10% phí dịch vụ",
      ],
    },
    {
      name: "Premium",
      price: "500,000đ / tháng",
      benefits: [
        "Tất cả quyền lợi Pro",
        "Hỗ trợ 24/7",
        "Quản lý bãi đỗ nâng cao",
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        Chọn gói hội viên của bạn
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              {plan.price}
            </p>
            <ul className="text-left mb-6">
              {plan.benefits.map((benefit, i) => (
                <li key={i} className="mb-2">✅ {benefit}</li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Mua ngay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
