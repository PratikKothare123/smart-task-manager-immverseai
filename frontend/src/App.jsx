import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import AllTasks from "./pages/AllTasks";
import BlockedTasks from "./pages/BlockedTasks";
import Users from "./pages/Users";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useAuth } from "./context/AuthContext";


const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


const App = () => {
    const { currentUser } = useAuth();

    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route
                    path="/login"
                    element={
                        currentUser
                            ? <Navigate to="/" replace />
                            : <Login />
                    }
                />

                <Route
                    path="/signup"
                    element={
                        currentUser
                            ? <Navigate to="/" replace />
                            : <Signup />
                    }
                />


                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<Dashboard />} />

                    <Route
                        path="/my-tasks"
                        element={<MyTasks />}
                    />

                    <Route
                        path="/all-tasks"
                        element={<AllTasks />}
                    />

                    <Route
                        path="/blocked-tasks"
                        element={<BlockedTasks />}
                    />

                    <Route
                        path="/users"
                        element={<Users />}
                    />
                </Route>


                {/* Unknown URL */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={currentUser ? "/" : "/login"}
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};

export default App;