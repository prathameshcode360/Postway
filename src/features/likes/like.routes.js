import express from "express";
import LikeController from "./like.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const likeController = new LikeController();

const likeRouter = express.Router();

likeRouter.get("/get/:id", likeController.getAllLikes);
likeRouter.post("/toggle/:id", jwtAuth, likeController.toggleLike);

export default likeRouter;
