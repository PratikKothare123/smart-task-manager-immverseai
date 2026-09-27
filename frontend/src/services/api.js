const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = async (endpoint, options = {}) => {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

export default api;