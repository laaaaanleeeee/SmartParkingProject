import React, { useState } from "react";
import { Tag, Button, Empty, Modal, message } from "antd";
import { Crown, Star, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const OwnerMembershipPage = () => {
  const [currentPlan, setCurrentPlan] = useState("CLASSIC");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { theme } = useTheme();

  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const bgMain = theme === "dark" ? "bg-gray-950" : "bg-gray-100";
  const bgCard = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderCard = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const plans = [
    {
      id: "CLASSIC",
      title: "Classic",
      price: "500.000 VNĐ / tháng",
      icon: <Star className="text-blue-500" size={32} />,
      features: [
        "Đăng ký 3 bãi đỗ",
        "Quản lý booking cơ bản",
        "Hỗ trợ qua email",
      ],
      color: "blue",
    },
    {
      id: "PRO",
      title: "Pro",
      price: "1.500.000 VNĐ / tháng",
      icon: <Crown className="text-yellow-500" size={32} />,
      features: [
        "Đăng ký không giới hạn bãi đỗ",
        "Quản lý booking nâng cao",
        "Thống kê doanh thu",
        "Hỗ trợ 24/7",
      ],
      color: "yellow",
    },
  ];

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setCurrentPlan(selectedPlan.id);
    message.success(`Bạn đã chọn gói ${selectedPlan.title} thành công!`);
    setIsModalOpen(false);
  };

  return (
    <div className={`p-6 min-h-screen ${bgMain} transition-colors`}>
      <h1 className={`text-2xl font-bold mb-6 ${textPrimary}`}>
        Gói hội viên của bạn
      </h1>

      {plans.length === 0 ? (
        <Empty description="Chưa có gói hội viên nào" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border shadow-md ${bgCard} ${borderCard} transition-colors`}
            >
              <div className="flex items-center gap-2 mb-4">
                {plan.icon}
                <span className={`text-lg font-semibold ${textPrimary}`}>
                  {plan.title}
                </span>
                {currentPlan === plan.id && (
                  <Tag color="blue" className="ml-2">
                    Đang sử dụng
                  </Tag>
                )}
              </div>

              <p className={`text-xl font-bold mb-4 ${textPrimary}`}>
                {plan.price}
              </p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx} className={`flex items-center gap-2 ${textSecondary}`}>
                    <CheckCircle2 className="text-green-500" size={16} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                type="primary"
                block
                onClick={() => openModal(plan)}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Đang sử dụng" : "Chọn gói này"}
              </Button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleConfirm}
        okText="Xác nhận"
        cancelText="Hủy"
        title="Xác nhận mua gói"
      >
        {selectedPlan && (
          <div>
            <p className={textSecondary}>
              Bạn có chắc chắn muốn chọn gói{" "}
              <span className={`font-semibold ${textPrimary}`}>
                {selectedPlan.title}
              </span>{" "}
              với giá{" "}
              <span className="text-blue-500">{selectedPlan.price}</span> không?
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OwnerMembershipPage;
