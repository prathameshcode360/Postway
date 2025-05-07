import express from "express";
import CommentController from "./comments.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const commentController = new CommentController();

const commentRouter = express();

commentRouter.get("/get/:id", (req, res, next) => {
  commentController.getComments(req, res, next);
});
commentRouter.post("/getOne/:id", jwtAuth, (req, res, next) => {
  commentController.getOneUserComments(req, res, next);
});

commentRouter.post("/add", jwtAuth, (req, res, next) => {
  commentController.addNewComment(req, res, next);
});
commentRouter.delete("/delete/:id", jwtAuth, (req, res, next) => {
  commentController.removeComment(req, res, next);
});

commentRouter.put("/update/:id", jwtAuth, (req, res, next) => {
  commentController.updateComment(req, res, next);
});

export default commentRouter;
