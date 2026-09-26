const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes for User
app.use("/api/users", userRoutes);
// Routes for Task
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Task Manager API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});