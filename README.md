## DevTinder Backend

A Node.js + Express + MongoDB backend for **DevTinder**, a developer networking platform enabling developers to connect, view profiles, send/accept connection requests, and chat in real time via Socket.io.

---

## Features

- **Authentication (Signup/Login/Logout)** using **HTTP-only cookies**
- **Profile Management** (View/Edit profile, Update password)
- **Connection Requests** (Send Interest/Ignore, Accept/Reject requests)
- **Feed**: View other developers excluding existing connections
- **Connections**: View accepted developer connections
- **Real-time Chat**: Chat with connected developers using **Socket.io**
- **Validation** using `validator.js` (Strong password, email, etc.)
- **MongoDB** with **Mongoose models** and relationships

---

## Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** (Mongoose ODM)
- **Socket.io** for real-time communication
- **Validator.js** for input validation
- **JWT** for authentication (stored in HTTP-only cookies)
- **bcrypt** for password hashing

---

## Live Demo

- **Frontend Live App:** [https://dev-tinder-qyta.onrender.com](https://dev-tinder-qyta.onrender.com)
- **Backend Live API Base URL:** `https://dev-tinder-backend-rli0.onrender.com/api`

> Example: `https://dev-tinder-backend-rli0.onrender.com/api/profile/view`

---

## Frontend Repository

[DevTinder Frontend GitHub Repository](https://github.com/Kalyanpandaga/dev_tinder_frontend)

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/Kalyanpandaga/dev_tinder_backend.git
cd dev-tinder-backend
```

2. Install dependencies

```bash
npm install
```

3. Set environment variables (Create `.env` file)

```env
PORT=<your_port_no>
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
FRONTEND_BASE_URL=<your_frontend_server_url>
```

4. Run development server

```bash
npm run dev
```

---

## API Routes Overview

### Auth Routes (`/api/`)

- `POST /signup` – Create account
- `POST /login` – Login and set HTTP-only cookie
- `POST /logout` – Logout and clear cookie

### Profile Routes (`/api/profile`)

- `GET /view` – View logged-in user profile
- `PUT /edit` – Edit profile
- `PUT /password` – Update password

### Request Routes (`/api/request`)

- `POST /send/:status/:toUserId` – Send interest or ignore
- `PATCH /review/:status/:requestId` – Accept/Reject a request

### User Routes (`/api/user`)

- `GET /requests/recieved` – Get received requests
- `GET /connections` – Get all your connections
- `GET /feed` – Get feed of other developers

### Chat Routes (`/api/chat`)

- `GET /:targetUserId` – Fetch chat messages with a user

---

## Real-Time Chat (Socket.io)

- Join chat room: `joinChat`
- Send message: `sendMessage`
- Receive message: `messageReceived`

Socket rooms are generated using a SHA256 hash of participant IDs to ensure privacy.

---
