import { Outlet } from "react-router-dom";
import WrapperTheme from "@/components/WrapperTheme";
import OwnerSidebar from "@/components/OwnerSidebar";


const OwnerLayout = () => {
    return (
        <WrapperTheme>
            <div className='flex h-screen'>
                <OwnerSidebar />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </WrapperTheme>
    );
};

export default OwnerLayout;
