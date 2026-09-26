import api from "./api";

export const createUser = async (userData) => {
    return await api("/users", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const loginUser = async (loginData) => {
    return await api("/users/login", {
        method: "POST",
        body: JSON.stringify(loginData)
    });
};

export const getAllUsers = async () => {
    return await api("/users");
};