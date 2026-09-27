import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks }) => {
    return (
        <div className="task-column">

            <div className="task-column-header">

                <h2>{title}</h2>

                <span className="task-count">
                    {tasks.length}
                </span>

            </div>

            <div className="task-column-content">

                {tasks.length === 0 ? (
                    <p className="empty-task-message">
                        No tasks
                    </p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))
                )}

            </div>

        </div>
    );
};

export default TaskColumn;