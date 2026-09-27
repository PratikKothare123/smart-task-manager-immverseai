import { useEffect, useState } from "react";

import {
    getAllTasks,
    deleteTask,
    markTaskComplete
} from "../services/taskService";

import TaskBoard from "../components/TaskBoard";
import EditTaskModal from "../components/EditTaskModal";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTask, setEditingTask] = useState(null);

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

    return (
        <div className="task-page">

            <div className="task-page-header">

                <div>

                    <h1>All Tasks</h1>

                    <p>
                        View and manage all tasks.
                    </p>

                </div>

            </div>

            {loading && (
                <div className="task-page-message">
                    Loading tasks...
                </div>
            )}

            {!loading && error && (
                <div className="task-page-message">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <TaskBoard
                    tasks={tasks}
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

export default AllTasks;