# ⚡ LUEV | Electric Vehicles Store

A full-stack web application for browsing and filtering electric vehicles.

---

## 🧱 Project Structure

```
electric-vehicles-store/
│
├── client(frontend)/     # React + Vite frontend
└── server(backend)/      # Node.js + Express backend 
```

---

## 🖥️ Local Setup Instructions

### 1. Clone the Repository and go inside cloned project

```bash
git clone https://github.com/mihirpatelyorku/electric-vehicles-store.git
cd electric-vehicles-store
```

---

## 🔧 Backend Setup (Node.js + Express)


### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Create `.env` File

Create a `.env` file in the `server/` directory:

```env
PORT=3000
DATABASE_URL=your_postgresql_connection_url (postgresql://username:password@host:port/database_name)
FRONTEND_URL=http://localhost:5173
SESSION_SECRET="some secret"
```

### 4. Start Backend Server

```bash
node --watch server.js
```


---

## 🎨 Frontend Setup (React + Vite)

### 5. Install Dependencies

```bash
cd ../client(frontend)
npm install
```

### 6. Configure Frontend Environment

Make the `.env` file inside `client(frontend)/`:

```env
VITE_API_URL=http://localhost:3000
```

### 7. Start Frontend App

```bash
npm run dev
```

---

## 🌐 Access the App

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📦 Scripts Summary

| Location             | Command           | Purpose                  |
|----------------------|-------------------|---------------------------|
| `server/`            | `node --watch server.js`     | Start backend server      |
| `client(frontend)/`  | `npm run dev`     | Start frontend (Vite)     |

---

## 📁 Example `.env` Files

### `server/.env`

```env
PORT=3000
DATABASE_URL=your_postgresql_connection_url
FRONTEND_URL=http://localhost:5173
SESSION_SECRET="some secret"
```

### `client(frontend)/.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## ✅ Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- npm
