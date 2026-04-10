# DevOps Taskboard — Backend 🛠️

A REST API built with **Node.js + Express** that powers the DevOps Taskboard app.
This is the backend service only. The frontend lives in a separate repository.

---

## Project Structure

```
backend/
├── package.json
├── .env.example
└── server.js
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher → check with `node -v`
- [npm](https://npmjs.com/) v9 or higher → check with `npm -v`

---

## Setup & Running

### Step 1 — Clone the repository

```bash
git clone https://github.com/<your-username>/taskboard-backend.git
cd taskboard-backend
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and confirm the values:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
```

> ⚠️ `FRONTEND_URL` must match exactly where your frontend is running, otherwise you will get CORS errors.

### Step 4 — Start the server

```bash
npm run dev
```

You should see:

```
🚀 Backend running on http://localhost:5000
   Accepting requests from: http://localhost:5173
   Health check: http://localhost:5000/api/health
```

---

## Available API Endpoints

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | /api/health    | Health check         |
| GET    | /api/tasks     | Get all tasks        |
| GET    | /api/tasks/:id | Get a single task    |
| POST   | /api/tasks     | Create a new task    |
| PATCH  | /api/tasks/:id | Update a task        |
| DELETE | /api/tasks/:id | Delete a task        |
| GET    | /api/stats     | Get task statistics  |

### Example — Create a task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My new task", "priority": "high", "category": "devops"}'
```

### Example — Get all tasks

```bash
curl http://localhost:5000/api/tasks
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start server with hot reload (nodemon) |
| `npm start` | Start server without hot reload |

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `CORS error` in frontend console | Wrong `FRONTEND_URL` in `.env` | Set it to `http://localhost:5173` |
| `Port already in use` | Another process using port 5000 | Change `PORT` in `.env` |
| `Cannot find module` | Dependencies not installed | Run `npm install` |
| `.env` values undefined | Missing `.env` file | Run `cp .env.example .env` |

---

## Related Repository

- 🖥️ Frontend → [taskboard-frontend](https://github.com/<your-username>/taskboard-frontend)

---

## Next Step — Dockerize It

Once the app is running, the next challenge is to write a `Dockerfile` for this service and connect it with the frontend using `docker-compose.yml`.