import TaskCard from "./TaskCard";

const TaskColumn = ({
    title,
    tasks,
    onEdit,
    onDelete
}) => {

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
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />

                    ))

                )}

            </div>

        </div>
    );
};

export default TaskColumn;