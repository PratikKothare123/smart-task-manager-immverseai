import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { currentUser } = useAuth();

    console.log("Current User:", currentUser);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to Smart Task Manager.</p>
        </div>
    );
};

export default Dashboard;