const TaskCard = ({ task }) => {
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

        </div>
    );
};

export default TaskCard;