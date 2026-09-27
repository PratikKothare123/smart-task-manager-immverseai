import { useEffect, useState } from "react";

import {
    createTask,
    getAllTasks
} from "../services/taskService";

import { getAllUsers } from "../services/userService";

const TaskForm = ({ onSuccess, onCancel }) => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        assignedTo: "",
        dependsOn: ""
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadFormData = async () => {
            try {
                const [userData, taskData] = await Promise.all([
                    getAllUsers(),
                    (await import("../services/taskService")).getAllTasks()
                ]);

                setUsers(userData.users);
                setTasks(taskData.tasks);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingData(false);
            }
        };

        loadFormData();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!formData.assignedTo) {
            setError("Please select a user.");
            return;
        }

        setLoading(true);

        try {
            await createTask({
                ...formData,
                dependsOn: formData.dependsOn || null
            });

            onSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="task-form-loading">
                Loading form...
            </div>
        );
    }

    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <div className="task-form-header">
                <div>
                    <h2>Create New Task</h2>
                    <p>Add a new task to your workspace.</p>
                </div>

                <button
                    type="button"
                    className="close-button"
                    onClick={onCancel}
                >
                    ×
                </button>
            </div>

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            {/* Title */}

            <div className="form-group">
                <label>
                    Task Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    required
                />
            </div>

            {/* Description */}

            <div className="form-group">
                <label>
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the task"
                    rows="4"
                    required
                />
            </div>

            {/* Priority + Status */}

            <div className="form-row">

                <div className="form-group">
                    <label>
                        Priority
                    </label>

                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="To Do">
                            To Do
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Done">
                            Done
                        </option>
                    </select>
                </div>

            </div>

            {/* Assign User */}

            <div className="form-group">
                <label>
                    Assign User
                </label>

                <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select a user
                    </option>

                    {users.map((user) => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name} ({user.email})
                        </option>
                    ))}
                </select>
            </div>

            {/* Dependency */}

            <div className="form-group">
                <label>
                    Depends On
                </label>

                <select
                    name="dependsOn"
                    value={formData.dependsOn}
                    onChange={handleChange}
                >
                    <option value="">
                        No dependency
                    </option>

                    {tasks.map((task) => (
                        <option
                            key={task.id}
                            value={task.id}
                        >
                            {task.title}
                        </option>
                    ))}
                </select>

                <small>
                    The task cannot be completed until its dependency is done.
                </small>
            </div>

            {/* Buttons */}

            <div className="form-actions">

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="create-button"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Create Task"}
                </button>

            </div>

        </form>
    );
};

export default TaskForm;