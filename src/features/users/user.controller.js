import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  getUsers(req, res, next) {
    try {
      const users = UserModel.getAll();
      return res.status(200).send({ users });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  signUp(req, res, next) {
    try {
      const { userName, password } = req.body;
      const newUser = UserModel.register(userName, password);
      return res
        .status(201)
        .send({ msg: "User added successfully", user: newUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  signIn(req, res, next) {
    try {
      const { userName, password } = req.body;
      const user = UserModel.login(userName, password);
      if (!user) {
        return res.status(404).send({ msg: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.userName,
        },
        "Vm+39ofliO?OoQJ",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send(token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  getOneUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = UserModel.getOneUser(id);
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
