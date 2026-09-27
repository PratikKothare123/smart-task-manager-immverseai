# Smart Task Manager

A simple task manager where teams can create, assign, and track to-dos. It lets you set priorities, update task statuses, and link tasks together so you always know what needs to be finished first.

---
### 🌐 Live Demo
- **Live Application:** [https://smart-task-manager-immverseai-8pxg-rho.vercel.app/login](https://smart-task-manager-immverseai-8pxg-rho.vercel.app/login)
- **Backend API :** [https://smart-task-manager-immverseai.onrender.com/](https://smart-task-manager-immverseai.onrender.com/)

---
## Features

- User signup, mock login, and logout
- View all registered users
- Create, update, and delete tasks
- Assign tasks to specific teammates
- Set task priority (Low, Medium, High)
- Track progress status (To Do, In Progress, Done)
- Task dependencies (tasks can't be completed if their parent task isn't done yet)
- Blocked tasks screen to spot bottlenecks
- "My Tasks" section to see your own work
- "All Tasks" view with a Kanban board layout
- Quick priority filter (All, Low, Medium, High)
- Clean, responsive dashboard layout

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Plain CSS

### Backend
- Node.js
- Express.js
- CORS

### Storage
- Simple in-memory JavaScript arrays for users and tasks (no external database required).

## Project Structure

```text
smart-task-manager/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── services/
│       ├── context/
│       └── App.jsx
│
└── README.md
```
### Installation & Setup
1. Backend
Open a terminal and run:

```
cd backend
npm install
npm run dev
```
The backend server runs on:
```
http://localhost:5000
```

2. Frontend
Open a second terminal and run:

```
cd frontend
npm install
npm run dev
```
The frontend runs locally on the Vite development server (typically http://localhost:5173).

# Core Logic & Concepts
## Task Dependency Logic
A task linked to another task (dependsOn) cannot be marked as Done until that dependency task itself reaches Done.

Tasks with unfinished dependencies automatically show up under the Blocked Tasks view.

Once the dependency task is completed, the dependent task is unblocked and can be finished normally.

### Authentication
Uses mock authentication as outlined in the project requirements.

Passwords are stored in plain text in-memory solely for basic assignment evaluation without external database setup.

# Notes
Since the data lives in in-memory JavaScript arrays, all users and tasks reset to their default seed state whenever the backend server restarts.

## Author
### Pratik D. Kothare

### Final Year CSE Student

S.B. Jain Institute of Technology, Management & Research, Nagpur
