const express = require("express");

const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);

module.exports = router;