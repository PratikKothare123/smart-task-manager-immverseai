import { useState } from "react";

const TaskCard = ({
    task,
    onEdit,
    onDelete
}) => {

    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);

        try {
            await onDelete(task.id);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="task-card">

            <div className="task-card-header">

                <h3>{task.title}</h3>

                <span
                    className={`priority-badge priority-${task.priority
                        .toLowerCase()
                        .replace(" ", "-")}`}
                >
                    {task.priority}
                </span>

            </div>

            <p className="task-description">
                {task.description}
            </p>

            <div className="task-card-details">

                <div>
                    <span className="detail-label">
                        Status
                    </span>

                    <span className="detail-value">
                        {task.status}
                    </span>
                </div>

                <div>
                    <span className="detail-label">
                        Assigned To
                    </span>

                    <span className="detail-value">
                        {task.assignedTo}
                    </span>
                </div>

            </div>

            {task.dependsOn && (
                <div className="dependency-info">
                    Depends on another task
                </div>
            )}

            <div className="task-card-actions">

                <button
                    className="edit-task-button"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>

                <button
                    className="delete-task-button"
                    onClick={handleDelete}
                    disabled={deleting}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>

            </div>

        </div>
    );
};

export default TaskCard;