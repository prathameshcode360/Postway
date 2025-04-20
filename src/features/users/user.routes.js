import express from "express";
import UserController from "./user.controller.js";

const userController = new UserController();

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/register", (req, res) => {
  userController.signUp(req, res);
});
userRouter.post("/login", userController.signIn);
userRouter.get("/:id", userController.getOneUser);

export default userRouter;
