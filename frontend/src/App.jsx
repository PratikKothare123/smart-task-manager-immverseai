import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import AllTasks from "./pages/AllTasks";
import BlockedTasks from "./pages/BlockedTasks";
import Users from "./pages/Users";

function App() {
    return (
        <BrowserRouter>
            <Routes>

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
    );
}

export default App;