import express from "express";
import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/posts", loggerMiddleware, postRouter);
server.use("/api/comments", loggerMiddleware, commentRouter);
server.use("/api/likes", loggerMiddleware, likeRouter);

server.get("/", (req, res) => {
  res.send("Welcome to node js server");
});

server.listen(3700, () => {
  console.log("Server is listening on port 3700");
});
