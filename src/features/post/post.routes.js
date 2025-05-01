import express from "express";
import PostController from "./post.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import fileUpload from "../../middlewares/fileUpload.middleware.js";

const postController = new PostController();

const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  postController.getPosts(req, res);
});
postRouter.get("/:id", (req, res) => {
  postController.getOnePost(req, res);
});
postRouter.post("/userPosts", jwtAuth, (req, res) => {
  postController.getUserPosts(req, res);
});
postRouter.post("/userPosts/:postId", jwtAuth, (req, res) => {
  postController.getUserOnePost(req, res);
});
postRouter.post("/add", jwtAuth, fileUpload.single("image"), (req, res) => {
  postController.createPost(req, res);
});
postRouter.put(
  "/update/:id",
  jwtAuth,
  fileUpload.single("image"),
  (req, res) => {
    postController.updatePost(req, res);
  }
);
postRouter.delete("/delete/:id", jwtAuth, (req, res) => {
  postController.deletePost(req, res);
});

export default postRouter;
