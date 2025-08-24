import { Outlet } from "react-router-dom";
import WrapperTheme from "../components/WrapperTheme";
import OwnerSidebar from "../components/OwnerSidebar";


const OwnerLayout = () => {
    return (
        <WrapperTheme>
            <div className='flex'>
                <OwnerSidebar />
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        </WrapperTheme>
    );
};

export default OwnerLayout;
