const express = require("express");

const {
    createUser,
    loginUser,
    getAllUsers
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

module.exports = router;


