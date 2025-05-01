import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import PostModel from "./post.model.js";

export default class PostRepository {
  constructor() {
    this.collection = "posts";
  }
  async getAll() {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      console.log("Error while getting all posts:", error);
    }
  }
  async getOnePost(postId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      const post = collection.findOne({ _id: new ObjectId(postId) });
      return post;
    } catch (error) {
      console.log("Error while getting one post:", error);
    }
  }
  async getUsersPosts(userId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId: userId }).toArray();
    } catch (error) {
      console.log("Error while getting users posts:", error);
    }
  }
  async add(caption, image, userId, username) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      const newPost = new PostModel(caption, image, userId, username);
      await collection.insertOne(newPost);
      return newPost;
    } catch (error) {
      console.log("Error while adding post:", error);
    }
  }
}
