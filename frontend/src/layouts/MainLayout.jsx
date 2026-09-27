import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import CreateTaskModal from "../components/CreateTaskModal";

const MainLayout = () => {
    const [showCreateTask, setShowCreateTask] = useState(false);

    const handleTaskCreated = () => {
        setShowCreateTask(false);
    };

    return (
        <div className="app-layout">

            <Sidebar
                onCreateTask={() => setShowCreateTask(true)}
            />

            <main className="main-content">
                <Outlet />
            </main>

            {showCreateTask && (
                <CreateTaskModal
                    onClose={() => setShowCreateTask(false)}
                    onSuccess={handleTaskCreated}
                />
            )}

        </div>
    );
};

export default MainLayout;