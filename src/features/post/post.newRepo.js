import PostModel from "./post.schemas.js";
import { ObjectId } from "mongodb";

export default class NewPostRepo {
  // for adding new post
  async add(caption, image, userId, username) {
    try {
      const newPost = new PostModel({ caption, image, userId, username });
      const savedPost = await newPost.save();
      return savedPost;
    } catch (error) {
      console.log("Error while adding post:", error);
    }
  }
  //   for getting all posts(not specific to one user);
  async getAll() {
    try {
      let posts = await PostModel.find();
      return posts;
    } catch (error) {
      console.log("Error while getting all posts:", error);
    }
  }
  //   for getting one post(not specific to one user);
  async getOne(postId) {
    try {
      const post = await PostModel.findById(postId);
      return post;
    } catch (error) {
      console.log("Error while getting one post:", error);
    }
  }
  //   for getting all posts of one user(specific to one user)
  async getUserPosts(userId) {
    try {
      let posts = await PostModel.find({ userId: userId });
      return posts;
    } catch (error) {
      console.log("Error while getting users posts:", error);
    }
  }
  // for getting one post of one user(specific to one user)

  async getUserOnePost(postId, userId) {
    try {
      const post = await PostModel.findOne({
        _id: new ObjectId(postId),
        userId: userId,
      });
      return post;
    } catch (error) {
      console.log("Error while getting user's one post:", error);
    }
  }
  //   for updating post(specific to one user)
  async update(postId, userId, caption, image) {
    try {
      const post = await PostModel.findOne({
        _id: new ObjectId(postId),
        userId: userId,
      });
      if (post) {
        post.caption = caption || post.caption;
        post.image = image || post.image;
        const updatedPost = await post.save();
        return updatedPost;
      }
    } catch (error) {
      console.log("Error while updating post:", error);
    }
  }

  //   for deleting post(specific to one user)
  async delete(postId, userId) {
    try {
      const deletedPost = await PostModel.findOneAndDelete({
        _id: new ObjectId(postId),
        userId: userId,
      });
      return deletedPost;
    } catch (error) {
      console.log("Error while deleting post:", error);
    }
  }

  //   another way to update post(specific to one user);
  //   async update(postId, userId, caption, image) {
  //     try {
  //       const updatedPost = await PostModel.findOneAndUpdate(
  //         {
  //           _id: new ObjectId(postId),
  //           userId: userId,
  //         },
  //         { caption: caption, image: image },
  //         { new: true } //to return the updated post
  //       );
  //       return updatedPost;
  //     } catch (error) {
  //       console.log("Error while updating post:", error);
  //     }
  //   }
}
