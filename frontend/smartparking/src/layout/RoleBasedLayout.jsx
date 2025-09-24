import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import OwnerLayout from "./OwnerLayout";

const RoleBasedLayout = () => {
  const { role } = useContext(AuthContext);

  if (!role) {
    return <MainLayout><Outlet /></MainLayout>;
  }

  switch (role) {
    case "ADMIN":
      return <AdminLayout><Outlet /></AdminLayout>;
    case "OWNER":
      return <OwnerLayout><Outlet /></OwnerLayout>;
    case "CLIENT":
    default:
      return <MainLayout><Outlet /></MainLayout>;
  }
};

export default RoleBasedLayout;
