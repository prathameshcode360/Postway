import express from "express";
import PostController from "./post.controller.js";

const postController = new PostController();

const postRouter = express.Router();

postRouter.get("/", postController.getPosts);
postRouter.post("/add", postController.createPost);

export default postRouter;
