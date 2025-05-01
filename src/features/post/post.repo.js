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
  async getUserPosts(userId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId: userId }).toArray();
    } catch (error) {
      console.log("Error while getting users posts:", error);
    }
  }
  async getUserOnePost(postId, userId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      const post = await collection.findOne({
        _id: new ObjectId(postId),
        userId: userId,
      });
      return post;
    } catch (error) {
      console.log("Error while getting user one post:", error);
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
  async update(postId, userId, caption, image) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);

      // check if the post exist and belongs to the user
      const post = await collection.findOne({
        _id: new ObjectId(postId),
        userId: userId,
      });
      if (!post) {
        return {
          msg: "post not found or does not belong to the user",
          updatedPost: null,
        };
      } else {
        const result = await collection.updateOne(
          {
            _id: new ObjectId(postId),
          },
          {
            $set: {
              caption: caption || post.caption,
              image: image || post.image,
            },
          }
        );
        const updatedPost = await collection.findOne({
          _id: new ObjectId(postId),
        });
        if (result.modifiedCount === 0) {
          return { msg: "post not updated", updatedPost: updatedPost };
        }
        return { msg: "post updated successfully", updatedPost: updatedPost };
      }
    } catch (error) {
      console.log("Error while updating post:", error);
    }
  }
  async delete(postId, userId) {
    try {
      const db = await getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(postId),
        userId: userId,
      });
      return result;
    } catch (error) {
      console.log("Error while deleting post:", error);
    }
  }
}
