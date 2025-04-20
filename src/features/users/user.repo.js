import { getDB } from "../../config/mongodb.js";
import UserModel from "./user.model.js";

export default class UserRepository {
  constructor() {}
  async register(userName, email, password) {
    try {
      const db = await getDB();
      const userCollection = db.collection("users");
      const newUser = new UserModel(userName, email, password);
      await userCollection.insertOne(newUser);
      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }
}
