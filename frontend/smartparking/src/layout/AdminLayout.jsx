import { Outlet } from "react-router-dom";
import WrapperTheme from "../components/WrapperTheme";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
    return (
        <WrapperTheme>
            <div className='flex'>
                <AdminSidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </WrapperTheme>
    );
};

export default AdminLayout;
