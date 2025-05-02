import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const userController = new UserController();

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  userController.getUsers(req, res, next);
});
userRouter.post("/register", (req, res, next) => {
  userController.signUp(req, res, next);
});
userRouter.post("/login", (req, res, next) => {
  userController.signIn(req, res, next);
});
userRouter.get("/:id", (req, res, next) => {
  userController.getOneUser(req, res, next);
});

userRouter.put("/resetPassword", jwtAuth, (req, res) => {
  userController.resetPassword(req, res);
});

export default userRouter;
