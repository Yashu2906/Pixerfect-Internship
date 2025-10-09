# 📝 Blog App (MERN Stack)

A full-stack **Blog Application** built using the **MERN** (MongoDB, Express, React, Node.js) stack.  
It allows users to register, log in, create, edit, and delete blog posts — with authentication and full CRUD operations.

---

## 🚀 Features

### 👤 Authentication

- User Registration (Signup)
- User Login with JWT Authentication
- Secure Password Hashing using bcrypt

### ✍️ Blog CRUD Operations

- Create a new post
- Read all or individual posts
- Update an existing post
- Delete a post

### 💡 Additional Features

- Responsive frontend (React)
- RESTful API backend (Express)
- MongoDB database for persistent storage
- Protected routes for authenticated users

---

## 🧩 Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | React, Vite, Axios           |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB (Mongoose)           |
| Authentication | JSON Web Token (JWT), bcrypt |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

- git clone https://github.com/yourusername/blog-app.git
- cd blog-app

### 2️⃣ Backend Setup (Assignment-3)

- cd Assignment-3
- npm install

- Run the backend server:

- node server.js

### 3️⃣ Frontend Setup (Assignment-2)

- cd ../Assignment-2/simple-react-blog-app
- npm install
- npm run dev

- Frontend will run at:
- 👉 http://localhost:5173

## 🔐 Authentication Flow

- User registers or logs in to get a JWT token.
- Token is stored in local storage.
- Protected routes (like create/edit/delete post) require a valid token.
- If token is invalid or missing → access is denied.

# 📸 Screenshots

## User Registration

![Screenshot](./screenshots/register1.png)

## User Login

![Screenshot](./screenshots/login1.png)

## Create Post

![Screenshot](./screenshots/newpost.png)

## Update & Delete Post

![Screenshot](./screenshots/edit&delete.png)

## MongoDB database and Collections of Blog-api

![Screenshot](./screenshots/mongoDB.png)
