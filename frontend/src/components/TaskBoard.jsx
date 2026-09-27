import TaskColumn from "./TaskColumn";

const TaskBoard = ({
    tasks,
    onEdit,
    onDelete,
    onComplete
}) => {

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
        <div className="task-board">

            <TaskColumn
                title="To Do"
                tasks={todoTasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
            />

            <TaskColumn
                title="In Progress"
                tasks={inProgressTasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
            />

            <TaskColumn
                title="Done"
                tasks={completedTasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onComplete={onComplete}
            />

        </div>
    );
};

export default TaskBoard;