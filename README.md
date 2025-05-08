# 📬 Postway - Social Media Backend API

Implementation of Backend REST API structure for a social media platform built using **Node.js**, **Express**, **MongoDB** with **Mongoose** for persistent storage, and additional features like **Friendship**, **OTP-based password reset**, and **JWT Authentication**.

---

## 🚀 Features

- **User registration & login** with JWT authentication
- **Create, read, update, and delete posts** (with image upload support)
- **Add, edit, and delete comments** on posts
- **Like/unlike functionality** for posts
- **Friendship management** (send requests, accept/decline)
- **OTP-based password reset** functionality
- Middleware for authentication and file uploads
- Uses **MongoDB** and **Mongoose** for database management
- **JWT tokens** stored in cookies for user authentication

---

## 📝 Notes

- **Postman Usage**: When making `GET` requests, you do not need to send anything in the Body tab. Just select **None** in the Body tab.
- **Token Storage**: You do not need to add the JWT token in the Authorization header manually. The token is stored in a secure **cookie** after login and is sent automatically with each request.
- **OTP Functionality**: For password reset, OTP is sent to the user’s **registered email address**. Ensure you provide a valid email format when testing.

---

## 🛠 Tech Stack

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for API routing
- **MongoDB** & **Mongoose**: Persistent storage and database modeling
- **JWT (JSON Web Tokens)**: For user authentication
- **Multer**: For file uploads
- **Nodemailer**: For sending OTP emails
- **Cookie-parser**: For handling cookies securely
- **Bcrypt.js**: For password hashing

---

## 📁 API Endpoints

### 👤 User Routes

| Method | Endpoint           | Description             | Auth Required |
| ------ | ------------------ | ----------------------- | ------------- |
| GET    | `/users/`          | Get all users           | ❌            |
| GET    | `/users/:id`       | Get a user by ID        | ❌            |
| POST   | `/users/register`  | Register a new user     | ❌            |
| POST   | `/users/login`     | Login user              | ❌            |
| PUT    | `/users/update`    | Update user profile     | ✅            |
| POST   | `/users/logout`    | Logout user             | ✅            |
| POST   | `/users/logoutAll` | Logout from all devices | ✅            |

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

### 🤝 Friendship Routes

| Method | Endpoint                  | Description                               | Auth Required |
| ------ | ------------------------- | ----------------------------------------- | ------------- |
| GET    | `/friendship/getFriends`  | Get all friends of the logged-in user     | ✅            |
| GET    | `/friendship/getPendings` | Get all pending friend requests           | ✅            |
| POST   | `/friendship/sendRequest` | Send a friend request                     | ✅            |
| POST   | `/friendship/toggle`      | Accept/Decline or Cancel a friend request | ✅            |

---

### 🔐 OTP Routes

| Method | Endpoint              | Description                            | Auth Required |
| ------ | --------------------- | -------------------------------------- | ------------- |
| POST   | `/otp/send-otp`       | Send OTP to email (for password reset) | ❌            |
| POST   | `/otp/verify-otp`     | Verify OTP sent to email               | ❌            |
| POST   | `/otp/reset-password` | Reset password after OTP verification  | ✅            |
