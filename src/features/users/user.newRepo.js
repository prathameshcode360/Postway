import mongoose from "mongoose";
import UserModel from "./user.schemas.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class NewUserRepo {
  async register(userName, email, password) {
    try {
      const newUser = new UserModel({ userName, email, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new ApplicationError("Invalid data: " + error.message, 400);
      }
      console.log("Error while registering user", error);
    }
  }

  async getByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.log("Error while finding user by email", error);
    }
  }
  async getAll() {
    try {
      return await UserModel.find({});
    } catch (error) {
      console.log("Error while getting all users", error);
    }
  }
  async resetPassword(userId, newPassword) {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        user.password = newPassword;
        await user.save();
        return "Password reset successfully";
      }
      return "user not found";
    } catch (error) {
      console.log("Error while resetting password", error);
    }
  }
}
