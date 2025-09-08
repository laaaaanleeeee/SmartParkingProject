import React from "react";

const OwnerMembershipPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "100,000đ / tháng",
      benefits: ["Hỗ trợ 24/7","Quản lý 3 bãi đỗ", "Xem lịch sử đặt chỗ"],
    },
    {
      name: "Pro",
      price: "200,000đ / tháng",
      benefits: [
        "Tất cả quyền lợi Basic",
        "Quản lý 6 bãi đỗ",
        "Giảm 10% phí dịch vụ",
      ],
    },
    {
      name: "Premium",
      price: "500,000đ / tháng",
      benefits: [
        "Tất cả quyền lợi Pro",
        "Quản lý không giới hạn bãi đỗ",
        "Quản lý bãi đỗ nâng cao",
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
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

export default OwnerMembershipPage;
