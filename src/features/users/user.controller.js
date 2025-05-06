// import UserRepository from "./user.repo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import NewUserRepo from "./user.newRepo.js";
import TokenModel from "./token.schem.js";
export default class UserController {
  constructor() {
    this.userRepo = new NewUserRepo();
  }

  async getUsers(req, res, next) {
    try {
      const users = await this.userRepo.getAll();
      if (users.length === 0) {
        return res.status(404).send({ msg: "No users found" });
      }
      return res.status(200).send({ users });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async signUp(req, res, next) {
    try {
      const { userName, email, password, gender } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = await this.userRepo.register(
        userName,
        email,
        hashPassword,
        gender
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
        //  save the token in the database
        await TokenModel.create({
          userId: user._id,
          token: token,
        });

        // save the token in the cookie
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1 * 60 * 60 * 1000,
        });

        return res
          .status(200)
          .send({
            msg: "Login successfully",
            token: token,
            note: "You don't need to send token in authorization header for secure routes,because we are already saving it in the cookie,although you can send it in the header as well",
          });
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

  async updateProfile(req, res, next) {
    try {
      const { newPassword, newUserName } = req.body;
      const hashPassword = await bcrypt.hash(newPassword, 12);
      const { userId } = req.user;
      const result = await this.userRepo.update(
        userId,
        newUserName,
        hashPassword
      );
      return res.status(200).send({ msg: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      res.clearCookie("token").status(200).send({ msg: "Logout successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async logoutFromAllDevices(req, res, next) {
    try {
      const { userId } = req.user;
      await TokenModel.deleteMany({ userId });
      res
        .clearCookie("token")
        .status(200)
        .send({ msg: "Logged out from all devices" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
