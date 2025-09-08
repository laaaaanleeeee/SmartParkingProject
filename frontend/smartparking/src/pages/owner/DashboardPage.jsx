import React from "react";
import { Card, Table } from "antd";
import { BarChart2, Building2, CalendarDays, DollarSign } from "lucide-react";

const DashboardPage = () => {
  const recentBookings = [
    { id: 1, customer: "Nguyen Van A", slot: "A1", status: "Confirmed" },
    { id: 2, customer: "Tran Thi B", slot: "B2", status: "Pending" },
    { id: 3, customer: "Le Van C", slot: "C3", status: "Cancelled" },
  ];

  const columns = [
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Slot", dataIndex: "slot", key: "slot" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Owner Dashboard</h1>
      <p className="text-gray-500">Tổng quan tình hình bãi đỗ</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="flex items-center gap-3">
          <Building2 size={28} />
          <div>
            <p className="text-gray-500">Parking Lots</p>
            <p className="text-xl font-bold">3</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <CalendarDays size={28} />
          <div>
            <p className="text-gray-500">Bookings Today</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <DollarSign size={28} />
          <div>
            <p className="text-gray-500">Revenue (Month)</p>
            <p className="text-xl font-bold">15,000,000đ</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <BarChart2 size={28} />
          <div>
            <p className="text-gray-500">Upcoming Bookings</p>
            <p className="text-xl font-bold">8</p>
          </div>
        </Card>
      </div>

      <Card title="Recent Bookings">
        <Table
          dataSource={recentBookings}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
