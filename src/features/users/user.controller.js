// import UserRepository from "./user.repo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import NewUserRepo from "./user.newRepo.js";
export default class UserController {
  constructor() {
    this.userRepo = new NewUserRepo();
  }

  async getUsers(req, res, next) {
    try {
      const users = await this.userRepo.getAll();
      return res.status(200).send({ users });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async signUp(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await this.userRepo.register(
        userName,
        email,
        hashPassword
      );
      return res
        .status(201)
        .send({ msg: "User added successfully", user: newUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepo.getByEmail(email);
      if (!user) {
        return res.status(404).send({ msg: "User Not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ msg: "Invalid Credentials" });
      } else {
        // console.log("User:", user);
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.userName,
          },
          "Vm+39ofliO?OoQJ",
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).send(token);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getOneUser(req, res, next) {
    try {
      const id = req.params.id;
      console.log(id);
      const user = await this.userRepo.getProfile(id);
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
