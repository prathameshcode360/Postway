import express from "express";
import LikeController from "./like.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const likeController = new LikeController();

const likeRouter = express.Router();

likeRouter.get("/:id", (req, res, next) => {
  likeController.getAllLikes(req, res, next);
});
likeRouter.post("/toggle/:id", jwtAuth, (req, res, next) => {
  likeController.toggleLike(req, res, next);
});

export default likeRouter;
