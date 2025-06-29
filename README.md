# 👻 Ghost Drop – Temporary Email Service

A sleek full-stack temporary email service inspired by F95-style UI. Generate disposable email IDs, receive messages, manage inbox, and more.

---

## 🔥 Features

- 🆕 Generate temporary email addresses instantly  
- 📥 Simulate receiving emails to inbox  
- 📨 View inbox with modern UI  
- 🗑️ Clear inbox  
- ❌ Delete entire email ID  
- 🔐 TTL (Time-to-live) and MongoDB-backed persistence  
- 🎨 Stylish dark theme UI with animated transitions  
- 📋 One-click copy email ID  
- 💌 Modal view for individual email preview

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **dotenv** for config
- **CORS** and **nodemon**

### Frontend
- **React.js** + **Vite**
- **Tailwind CSS** + custom utility classes
- **Framer Motion** for animations

---

## 🧪 API Endpoints (Backend)

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| GET    | `/generate-temp-email`       | Generate a new temp email        |
| GET    | `/inbox/:id`                 | Fetch inbox for email ID         |
| DELETE | `/inbox/:id`                 | Clear inbox for email ID         |
| DELETE | `/email/:id`                 | Delete the entire email ID       |
| POST   | `/inbox/:id`                 | Add mail (for simulation/dev)    |
| DELETE | `/delete-id/:id`             | (Legacy) Delete email + inbox    |

---

### 📥 Add Mail (Dev Testing)

```http
POST /inbox/:id
Content-Type: application/json

{
  "from": "someone@example.com",
  "subject": "Hello there!",
  "body": "Just testing the Ghost Drop inbox."
}
