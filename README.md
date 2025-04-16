# 📬 Postway

Implementation of Backend REST API structure for a social media platform built using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- User registration & login with JWT authentication
- Create, read, update, and delete posts (with image upload support)
- Add, edit, and delete comments on posts
- Like/unlike functionality for posts
- View user-specific posts
- Middleware for authentication and file uploads

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- Multer (File Uploads)

---

## 📁 API Endpoints

### 👤 User Routes

| Method | Endpoint          | Description         | Auth Required |
| ------ | ----------------- | ------------------- | ------------- |
| GET    | `/users/`         | Get all users       | ❌            |
| GET    | `/users/:id`      | Get a user by ID    | ❌            |
| POST   | `/users/register` | Register a new user | ❌            |
| POST   | `/users/login`    | Login user          | ❌            |

---

### 📝 Post Routes

| Method | Endpoint            | Description                     | Auth Required |
| ------ | ------------------- | ------------------------------- | ------------- |
| GET    | `/posts/`           | Get all posts                   | ❌            |
| GET    | `/posts/:id`        | Get a single post by ID         | ❌            |
| POST   | `/posts/userPosts`  | Get posts by the logged-in user | ✅            |
| POST   | `/posts/add`        | Create a new post with image    | ✅            |
| PUT    | `/posts/update/:id` | Update a post                   | ✅            |
| DELETE | `/posts/delete/:id` | Delete a post                   | ✅            |

---

### 💬 Comment Routes

| Method | Endpoint               | Description                 | Auth Required |
| ------ | ---------------------- | --------------------------- | ------------- |
| GET    | `/comments/get/:id`    | Get all comments for a post | ❌            |
| POST   | `/comments/getOne/:id` | Get a single comment        | ✅            |
| POST   | `/comments/add`        | Add a new comment           | ✅            |
| PUT    | `/comments/update/:id` | Update a comment            | ✅            |
| DELETE | `/comments/delete/:id` | Delete a comment            | ✅            |

---

### ❤️ Like Routes

| Method | Endpoint            | Description                   | Auth Required |
| ------ | ------------------- | ----------------------------- | ------------- |
| GET    | `/likes/:id`        | Get all likes for a post      | ❌            |
| POST   | `/likes/toggle/:id` | Toggle like/unlike for a post | ✅            |

---

## 🔐 Authentication

For routes that require authentication, include the JWT token in the request header:
