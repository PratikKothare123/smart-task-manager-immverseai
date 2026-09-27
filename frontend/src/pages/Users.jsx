import { useEffect, useState } from "react";

import { getAllUsers } from "../services/userService";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllUsers();

            setUsers(data.users);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="users-page">

            <div className="users-page-header">
                <div>
                    <h1>Users</h1>

                    <p>
                        View all users in the workspace.
                    </p>
                </div>

                <div className="users-count">
                    {users.length} Users
                </div>
            </div>

            {loading && (
                <div className="page-message">
                    Loading users...
                </div>
            )}

            {!loading && error && (
                <div className="page-message error-message">
                    {error}
                </div>
            )}

            {!loading && !error && users.length === 0 && (
                <div className="page-message">
                    No users found.
                </div>
            )}

            {!loading && !error && users.length > 0 && (
                <div className="users-grid">

                    {users.map((user) => (
                        <div
                            className="user-card"
                            key={user.id}
                        >

                            <div className="user-avatar">
                                {user.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="user-info">

                                <h3>
                                    {user.name}
                                </h3>

                                <p>
                                    {user.email}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default Users;