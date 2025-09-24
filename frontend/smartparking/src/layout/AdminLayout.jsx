import { Outlet } from "react-router-dom";
import WrapperTheme from "@/components/WrapperTheme";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = () => {
    return (
        <WrapperTheme>
            <div className='flex h-screen'>
                <AdminSidebar />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </WrapperTheme>
    );
};

export default AdminLayout;
