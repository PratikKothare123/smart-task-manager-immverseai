import { useEffect, useState } from "react";
import { getAllTasks } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { currentUser } = useAuth();

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllTasks();

            setTasks(data.tasks);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const todoTasks = tasks.filter(
        (task) => task.status === "To Do"
    );

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    );

    const completedTasks = tasks.filter(
        (task) => task.status === "Done"
    );

    return (
        <div className="dashboard">

            {/* Dashboard Header */}
            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Welcome back,{" "}
                        <strong>
                            {currentUser?.name || "User"}
                        </strong>{" "}
                        
                    </p>
                </div>

            </div>

            {/* Dashboard Overview */}
            <div className="dashboard-overview">

                <div className="overview-header">

                    <div>
                        {/* <h2>Dashboard Overview</h2> */}

                        <p>
                            Summary metrics and key task performance
                        </p>
                    </div>

                    {/* <button
                        className="refresh-button"
                        onClick={fetchTasks}
                    >
                        ↻ &nbsp; Refresh
                    </button> */}

                </div>

                {/* Loading */}
                {loading && (
                    <p className="dashboard-message">
                        Loading tasks...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <p className="dashboard-error">
                        {error}
                    </p>
                )}

                {/* Statistics */}
                {!loading && !error && (
                    <div className="stats-container">

                        {/* Total Tasks */}
                        <div className="stat-card total-card">

                            <div className="stat-content">

                                <div>
                                    <h3>TOTAL TASKS</h3>

                                    <p className="stat-number">
                                        {tasks.length}
                                    </p>

                                    <span>
                                        {tasks.length} total created
                                    </span>
                                </div>

                                <div className="stat-icon total-icon">
                                    ▤
                                </div>

                            </div>

                        </div>

                        {/* Completed */}
                        <div className="stat-card completed-card">

                            <div className="stat-content">

                                <div>
                                    <h3>COMPLETED TASK</h3>

                                    <p className="stat-number">
                                        {completedTasks.length}
                                    </p>

                                    <span>
                                        {completedTasks.length}/{tasks.length} completed
                                    </span>
                                </div>

                                <div className="stat-icon completed-icon">
                                    ✓
                                </div>

                            </div>

                        </div>

                        {/* In Progress */}
                        <div className="stat-card progress-card">

                            <div className="stat-content">

                                <div>
                                    <h3>TASK IN PROGRESS</h3>

                                    <p className="stat-number">
                                        {inProgressTasks.length}
                                    </p>

                                    <span>
                                        Active sprint tasks
                                    </span>
                                </div>

                                <div className="stat-icon progress-icon">
                                    ◷
                                </div>

                            </div>

                        </div>

                        {/* To Do */}
                        <div className="stat-card todo-card">

                            <div className="stat-content">

                                <div>
                                    <h3>TO DOS</h3>

                                    <p className="stat-number">
                                        {todoTasks.length}
                                    </p>

                                    <span>
                                        Pending action items
                                    </span>
                                </div>

                                <div className="stat-icon todo-icon">
                                    ✓
                                </div>

                            </div>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Dashboard;