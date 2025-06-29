# 📬 Ghost Drop API

A lightweight Express + MongoDB backend for generating and managing temporary email addresses.

## 🚀 Features

- Generate temporary email addresses
- Simulate receiving emails
- Retrieve inbox
- Delete individual emails
- Clear inbox or delete entire address

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- UUID for temp ID generation
- Postman for testing

## 📡 API Endpoints

### Generate Temp Email
`GET /generate-temp-email`

### Get Inbox
`GET /inbox/:id`

### Add Mail (simulate)
`POST /inbox/:id`  
```json
{
  "from": "someone@example.com",
  "subject": "Hello",
  "body": "Testing temp mail"
}
