import UserModel from "./user.schemas.js";

export default class NewUserRepo {
  async register(userName, email, password) {
    try {
      const newUser = new UserModel({ userName, email, password });
      await newUser.save();
      return newUser;
    } catch (error) {
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
}
