import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const userController = new UserController();

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  userController.getUsers(req, res);
});
userRouter.post("/register", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/login", (req, res) => {
  userController.signIn(req, res);
});
userRouter.get("/:id", (req, res) => {
  userController.getOneUser(req, res);
});

userRouter.put("/resetPassword", jwtAuth, (req, res) => {
  userController.resetPassword(req, res);
});

export default userRouter;
