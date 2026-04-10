require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// In-memory store (acts like a simple database)
let tasks = [
  {
    id: uuidv4(),
    title: "Clone the repository",
    priority: "high",
    category: "setup",
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Install backend dependencies",
    priority: "high",
    category: "setup",
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Set up .env files",
    priority: "high",
    category: "config",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Run the backend server",
    priority: "medium",
    category: "devops",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Install frontend dependencies",
    priority: "medium",
    category: "setup",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Run the frontend server",
    priority: "medium",
    category: "devops",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Dockerize the whole app",
    priority: "low",
    category: "devops",
    done: false,
    createdAt: new Date().toISOString(),
  },
];

// GET /api/tasks — fetch all tasks (optional filter by category or done)
app.get("/api/tasks", (req, res) => {
  let result = [...tasks];
  if (req.query.category) {
    result = result.filter((t) => t.category === req.query.category);
  }
  if (req.query.done !== undefined) {
    result = result.filter((t) => String(t.done) === req.query.done);
  }
  res.json(result);
});

// GET /api/tasks/:id — fetch a single task
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// POST /api/tasks — create a new task
app.post("/api/tasks", (req, res) => {
  const { title, priority = "medium", category = "general" } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  const task = {
    id: uuidv4(),
    title: title.trim(),
    priority,
    category,
    done: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PATCH /api/tasks/:id — update a task (toggle done, change priority, etc.)
app.patch("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks[index] = { ...tasks[index], ...req.body, id: tasks[index].id };
  res.json(tasks[index]);
});

// DELETE /api/tasks/:id — delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(index, 1)[0];
  res.json({ message: "Task deleted", task: deleted });
});

// GET /api/stats — summary stats
app.get("/api/stats", (req, res) => {
  res.json({
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    pending: tasks.filter((t) => !t.done).length,
    byPriority: {
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    },
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime().toFixed(2) + "s" });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running on http://localhost:${PORT}`);
  console.log(`   Accepting requests from: ${FRONTEND_URL}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});