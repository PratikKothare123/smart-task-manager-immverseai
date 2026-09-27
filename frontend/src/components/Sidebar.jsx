import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onCreateTask }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <h2>Smart Task Manager</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/my-tasks">My Tasks</NavLink>
                <NavLink to="/all-tasks">All Tasks</NavLink>
                <NavLink to="/blocked-tasks">Blocked Tasks</NavLink>
                <NavLink to="/users">Users</NavLink>
            </nav>

            <div className="sidebar-bottom">

                <button
                    className="sidebar-create-button"
                    onClick={onCreateTask}
                >
                    + Create Task
                </button>

                {currentUser && (
                    <div className="sidebar-user">

                        <div className="sidebar-user-info">
                            <strong>
                                {currentUser.name.toUpperCase()}
                            </strong>

                            <span>
                                {currentUser.email}
                            </span>
                        </div>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                            title="Logout"
                        >
                            →
                        </button>

                    </div>
                )}

            </div>

        </aside>
    );
};

export default Sidebar;