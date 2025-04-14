import express from "express";
import CommentController from "./comments.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const commentController = new CommentController();

const commentRouter = express();

commentRouter.get("/get/:id", commentController.getComments);
commentRouter.post("/getOne/:id", jwtAuth, commentController.getOneComment);

commentRouter.post("/add", jwtAuth, commentController.addNewComment);

export default commentRouter;
