import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Outlet />       
                {/* Render the currently selected page here */}
            </main>
        </div>
    );
};

export default MainLayout;