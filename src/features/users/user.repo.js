import { ObjectId } from "mongodb";
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
  async getByEmail(email) {
    try {
      const db = await getDB();
      const userCollection = db.collection("users");
      const user = await userCollection.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error logging user:", error);
    }
  }
  async getProfile(userId) {
    try {
      const db = await getDB();
      const collection = db.collection("users");

      const user = await collection.findOne({ _id: new ObjectId(userId) });
      return user;
    } catch (error) {
      console.error("Error while getting users profile:", error);
    }
  }
  async getAll() {
    try {
      const db = await getDB();
      const collection = db.collection("users");
      return await collection.find().toArray();
    } catch (error) {
      console.error("Error while getting all users:", error);
    }
  }
}
