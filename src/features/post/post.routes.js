import express from "express";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import fileUpload from "../../middlewares/fileUpload.middleware.js";

const postController = new PostController();

const postRouter = express.Router();

postRouter.get("/", (req, res, next) => {
  postController.getPosts(req, res, next);
});
postRouter.get("/:id", (req, res, next) => {
  postController.getOnePost(req, res, next);
});
postRouter.post("/userPosts", jwtAuth, (req, res, next) => {
  postController.getUserPosts(req, res, next);
});
postRouter.post("/userPosts/:postId", jwtAuth, (req, res, next) => {
  postController.getUserOnePost(req, res, next);
});
postRouter.post(
  "/add",
  jwtAuth,
  fileUpload.single("image"),
  (req, res, next) => {
    postController.createPost(req, res, next);
  }
);
postRouter.put(
  "/update/:id",
  jwtAuth,
  fileUpload.single("image"),
  (req, res, next) => {
    postController.updatePost(req, res, next);
  }
);
postRouter.delete("/delete/:id", jwtAuth, (req, res, next) => {
  postController.deletePost(req, res, next);
});

export default postRouter;
