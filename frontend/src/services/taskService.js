import api from "./api";

export const createTask = async (taskData) => {
    return await api("/tasks", {
        method: "POST",
        body: JSON.stringify(taskData)
    });
};

export const getAllTasks = async () => {
    return await api("/tasks");
};

export const getTaskById = async (taskId) => {
    return await api(`/tasks/${taskId}`);
};

export const updateTask = async (taskId, taskData) => {
    return await api(`/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(taskData)
    });
};

export const deleteTask = async (taskId) => {
    return await api(`/tasks/${taskId}`, {
        method: "DELETE"
    });
};

export const markTaskComplete = async (taskId) => {
    return await api(`/tasks/${taskId}/complete`, {
        method: "PATCH"
    });
};

export const getBlockedTasks = async () => {
    return await api("/tasks/blocked");
};

export const getTasksByUser = async (userId) => {
    return await api(`/tasks/user/${userId}`);
};