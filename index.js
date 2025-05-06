import express from "express";
// import { connectToDatabase } from "./src/config/mongodb.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import commentRouter from "./src/features/comments/comments.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
// import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import { connectWithMongoose } from "./src/config/mongoose.js";

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", commentRouter);
server.use("/api/likes", likeRouter);

server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }
  res.status(500).send("Something went wrong please try again later");
});

server.use((req, res) => {
  return res.send(
    "404:API route not found please check the documentaion for the correct route"
  );
});

server.listen(3700, () => {
  console.log("Server is listening on port 3700");
  // connectToDatabase();
  connectWithMongoose();
});
