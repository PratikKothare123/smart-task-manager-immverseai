import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import AllTasks from "./pages/AllTasks";
import BlockedTasks from "./pages/BlockedTasks";
import Users from "./pages/Users";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>

                    <Route
                            path="/login"
                            element={<Login />}
                    />
                    <Route element={<MainLayout />}>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

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

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;