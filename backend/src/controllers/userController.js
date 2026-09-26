const users = require("../models/userModel");
const { randomUUID } = require("crypto");
// Create a new user
const createUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        return res.status(409).json({
            message: "User with this email already exists"
        });
    }

    const newUser = {
        id: randomUUID(),
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
};


// Login user
const loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
};


// Get all users
const getAllUsers = (req, res) => {
    const safeUsers = users.map(({ password, ...user }) => user);

    res.json({
        users: safeUsers
    });
};


module.exports = {
    createUser,
    loginUser,
    getAllUsers
};