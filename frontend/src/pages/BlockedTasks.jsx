import { useEffect, useState } from "react";

import {
    getBlockedTasks,
    deleteTask,
    markTaskComplete
} from "../services/taskService";

import TaskCard from "../components/TaskCard";
import EditTaskModal from "../components/EditTaskModal";

const BlockedTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    const fetchBlockedTasks = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getBlockedTasks();

            setTasks(data.tasks);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchBlockedTasks();
    }, []);

    const handleDelete = async (taskId) => {

        try {

            await deleteTask(taskId);

            await fetchBlockedTasks();

        } catch (error) {

            setError(error.message);

        }
    };

    const handleComplete = async (taskId) => {

        try {

            await markTaskComplete(taskId);

            await fetchBlockedTasks();

        } catch (error) {

            setError(error.message);

        }
    };

    const handleEditSuccess = async () => {

        setEditingTask(null);

        await fetchBlockedTasks();
    };

    return (
        <div className="task-page">

            <div className="task-page-header">

                <div>

                    <h1>Blocked Tasks</h1>

                    <p>
                        Tasks waiting for their dependencies.
                    </p>

                </div>

            </div>

            {loading && (
                <div className="task-page-message">
                    Loading blocked tasks...
                </div>
            )}

            {!loading && error && (
                <div className="task-page-message">
                    {error}
                </div>
            )}

            {!loading && !error && tasks.length === 0 && (
                <div className="task-page-message">
                    No blocked tasks.
                </div>
            )}

            {!loading && !error && tasks.length > 0 && (
                <div className="blocked-task-list">

                    {tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={setEditingTask}
                            onDelete={handleDelete}
                            onComplete={handleComplete}
                        />

                    ))}

                </div>
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

export default BlockedTasks;