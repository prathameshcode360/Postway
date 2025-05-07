import express from "express";
import FriendshipController from "./friendship.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const friendshipRouter = express.Router();

const friendshipController = new FriendshipController();

friendshipRouter.get("/getFriends", jwtAuth, (req, res, next) => {
  friendshipController.getAllFriends(req, res, next);
});

friendshipRouter.get("/getPendings", jwtAuth, (req, res, next) => {
  friendshipController.getPendingRequests(req, res, next);
});

friendshipRouter.post("/sendRequest", jwtAuth, (req, res, next) => {
  friendshipController.sendFriendRequest(req, res, next);
});

friendshipRouter.post("/toggle", jwtAuth, (req, res, next) => {
  friendshipController.toggleRequest(req, res, next);
});

export default friendshipRouter;
