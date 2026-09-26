import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>Smart Task Manager</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/">
                    Dashboard
                </NavLink>

                <NavLink to="/my-tasks">
                    My Tasks
                </NavLink>

                <NavLink to="/all-tasks">
                    All Tasks
                </NavLink>

                <NavLink to="/blocked-tasks">
                    Blocked Tasks
                </NavLink>

                <NavLink to="/users">
                    Users
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;