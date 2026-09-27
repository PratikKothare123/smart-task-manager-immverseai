import { useEffect, useState } from "react";

import {
    updateTask,
    getAllTasks
} from "../services/taskService";

import { getAllUsers } from "../services/userService";

const EditTaskModal = ({
    task,
    onClose,
    onSuccess
}) => {

    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo,
        dependsOn: task.dependsOn || ""
    });

    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadData = async () => {
            try {

                const [
                    userData,
                    taskData
                ] = await Promise.all([
                    getAllUsers(),
                    getAllTasks()
                ]);

                setUsers(userData.users);
                setTasks(taskData.tasks);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoadingData(false);

            }
        };

        loadData();

    }, []);

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            await updateTask(
                task.id,
                {
                    title: formData.title,
                    description: formData.description,
                    priority: formData.priority,
                    status: formData.status,
                    assignedTo: formData.assignedTo
                }
            );

            onSuccess();

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };

    if (loadingData) {
        return (
            <div className="modal-overlay">

                <div className="modal-container">

                    <div className="task-form-loading">
                        Loading task...
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="modal-overlay">

            <div className="modal-container">

                <form
                    className="task-form"
                    onSubmit={handleSubmit}
                >

                    <div className="task-form-header">

                        <div>

                            <h2>
                                Edit Task
                            </h2>

                            <p>
                                Update task information.
                            </p>

                        </div>

                        <button
                            type="button"
                            className="close-button"
                            onClick={onClose}
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

                    {/* Assigned User */}

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

                            {tasks
                                .filter(
                                    (item) =>
                                        item.id !== task.id
                                )
                                .map((item) => (

                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.title}
                                    </option>

                                ))}

                        </select>

                    </div>

                    {/* Actions */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : "Update Task"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default EditTaskModal;