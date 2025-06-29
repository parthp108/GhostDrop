# 📬 GhostDrop – Temporary Email API

**GhostDrop** is a full-stack web app that allows users to generate temporary email addresses, receive simulated messages, and manage a disposable inbox with ease.  

Built with **Express + MongoDB** on the backend and **React + Tailwind CSS** on the frontend.

> 🌐 Live App: [https://ghostdrop.onrender.com](https://ghostdrop.onrender.com)  
> 👨‍💻 Built by: [@parthp108](https://github.com/parthp108)

---

## 🚀 Features

- 🔹 Generate UUID-based temporary email IDs  
- 📨 Simulate receiving emails  
- 🗑️ Delete individual emails  
- 🧹 Clear entire inbox  
- ❌ Delete the full temporary email ID  
- 💻 Beautiful modern dark UI with Tailwind + Framer Motion  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

### 🛠️ Backend
- Node.js + Express.js
- MongoDB (with Mongoose)
- UUID
- CORS

---

## 📡 API Endpoints

> **Base URL**: `https://ghostdrop.onrender.com`

### ➕ Generate Temp Email
```
GET /generate-temp-email
```

### 📥 Get Inbox
```
GET /inbox/:id
```

### 📨 Add Email (Simulate)
```
POST /inbox/:id
```

**Body Example:**
```json
{
  "from": "sender@example.com",
  "subject": "Hello Ghost",
  "body": "This is a test message."
}
```

### 🧹 Clear Inbox
```
DELETE /inbox/:id
```

### ❌ Delete One Mail
```
DELETE /inbox/:id/:index
```

### 🔥 Delete Temp Email ID
```
DELETE /delete-id/:id
```

---

## 🖥️ Running Locally

### 🔧 Backend Setup
```bash
cd ghost-drop-backend
npm install

# Create .env file
touch .env
```

**Add this in `.env`:**
```
MONGO_URI=your_mongodb_connection_string
```

```bash
npm run dev
```

---

### 🎨 Frontend Setup
```bash
cd ghost-drop-frontend
npm install

# Create .env file
touch .env
```

**Add this in `.env`:**
```
VITE_API_BASE_URL=http://localhost:7070
```

```bash
npm run dev
```

---

## 📜 License

MIT © 2025 [Parth Patel](https://github.com/parthp108)

