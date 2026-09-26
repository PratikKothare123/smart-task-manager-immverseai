const { randomUUID } = require("crypto");

const tasks = require("../models/taskModel");
const users = require("../models/userModel");

const createTask = (req, res) => {
    const {
        title,
        description,
        priority,
        status,
        assignedTo
    } = req.body;

    if (!title || !description || !priority || !status || !assignedTo) {
        return res.status(400).json({
            message: "All task fields are required"
        });
    }

    const user = users.find((user) => user.id === assignedTo);

    if (!user) {
        return res.status(404).json({
            message: "Assigned user not found"
        });
    }


//Depends On for Task 
if (dependsOn) {
    const dependencyTask = tasks.find(
        (task) => task.id === dependsOn
    );

    if (!dependencyTask) {
        return res.status(404).json({
            message: "Dependency task not found"
        });
    }
}


const newTask = {
    id: randomUUID(),
    title,
    description,
    priority,
    status,
    assignedTo,
    dependsOn: dependsOn || null
};

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
};

//Get All tasks

const getAllTasks = (req, res) => {
    res.json({
        tasks
    });
};

//Get One Specific Task
const getTaskById = (req, res) => {
    const { id } = req.params;

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json({
        task
    });
};

// Update Task
const updateTask = (req, res) => {
    const { id } = req.params;

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const {
        title,
        description,
        priority,
        status,
        assignedTo,
        dependsOn
    } = req.body;

    // If assignedTo is provided, verify that user exists
    if (assignedTo) {
        const user = users.find((user) => user.id === assignedTo);

        if (!user) {
            return res.status(404).json({
                message: "Assigned user not found"
            });
        }

        task.assignedTo = assignedTo;
    }

    // Update only fields that are provided
    if (title !== undefined) {
        task.title = title;
    }

    if (description !== undefined) {
        task.description = description;
    }

    if (priority !== undefined) {
        task.priority = priority;
    }

    if (status !== undefined) {
        task.status = status;
    }

    res.json({
        message: "Task updated successfully",
        task
    });
};

//Deletee  Task
const deleteTask = (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
};


module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};