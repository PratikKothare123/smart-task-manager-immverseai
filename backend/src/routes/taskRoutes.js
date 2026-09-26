const express = require("express");

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    markTaskComplete
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/complete", markTaskComplete);


module.exports = router;