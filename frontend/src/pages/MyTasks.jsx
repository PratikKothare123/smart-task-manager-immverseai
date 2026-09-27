import { useEffect, useState } from "react";
import PriorityFilter from "../components/PriorityFilter";

import {
    getTasksByUser,
    deleteTask,
    markTaskComplete
} from "../services/taskService";

import { useAuth } from "../context/AuthContext";

import TaskBoard from "../components/TaskBoard";
import EditTaskModal from "../components/EditTaskModal";

const MyTasks = () => {
    const { currentUser } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    const filteredTasks =
        priorityFilter === "All"
            ? tasks
            : tasks.filter(
                  (task) => task.priority === priorityFilter
              );

    const fetchTasks = async () => {
        if (!currentUser) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getTasksByUser(currentUser.id);

            setTasks(data.tasks);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [currentUser]);

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            await fetchTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleComplete = async (taskId) => {
        try {
            await markTaskComplete(taskId);
            await fetchTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditSuccess = async () => {
        setEditingTask(null);
        await fetchTasks();
    };

    if (!currentUser) {
        return (
            <div className="task-page-message">
                Please login to view your tasks.
            </div>
        );
    }

    return (
        <div className="task-page">
            <div className="task-page-header">
                <div>
                    <h1>My Tasks</h1>
                    <p>Tasks assigned to you.</p>
                </div>

                <PriorityFilter
                    value={priorityFilter}
                    onChange={setPriorityFilter}
                />
            </div>

            {loading && (
                <div className="task-page-message">
                    Loading your tasks...
                </div>
            )}

            {!loading && error && (
                <div className="task-page-message">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <TaskBoard
                    tasks={filteredTasks}
                    onEdit={setEditingTask}
                    onDelete={handleDelete}
                    onComplete={handleComplete}
                />
            )}

            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onSuccess={handleEditSuccess}
                />
            )}
        </div>
    );
};

export default MyTasks;