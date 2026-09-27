import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize currentUser from localStorage so state persists on page refresh
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Error reading currentUser from localStorage:", error);
            return null;
        }
    });

    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);

        try {
            const data = await loginUser({
                email,
                password,
            });

            setCurrentUser(data.user);

            // Persist logged-in user in localStorage
            localStorage.setItem("currentUser", JSON.stringify(data.user));

            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};