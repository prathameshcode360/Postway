import PostModel from "./post.model.js";
import PostRepository from "./post.repo.js";

export default class PostController {
  constructor() {
    this.postRepo = new PostRepository();
  }
  async getPosts(req, res, next) {
    try {
      let posts = await this.postRepo.getAll();
      if (posts.length === 0) {
        return res.status(404).send({ msg: "No posts found" });
      }
      return res.status(200).send({ posts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getOnePost(req, res, next) {
    try {
      const id = req.params.id;
      const post = await this.postRepo.getOnePost(id);
      if (!post) {
        return res.status(404).send({ msg: "Post not found" });
      }
      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUserPosts(req, res, next) {
    try {
      const { userId } = req.user;
      let userPosts = await this.postRepo.getUserPosts(userId);
      if (userPosts.length === 0) {
        return res.status(404).send({ msg: "No post found for this user" });
      }
      return res.status(200).send({ userPosts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUserOnePost(req, res, next) {
    try {
      const postId = req.params.postId;
      const { userId } = req.user;
      const post = await this.postRepo.getUserOnePost(postId, userId);
      if (!post) {
        return res.status(404).send({ msg: "post not found" });
      }
      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const { caption } = req.body;
      const image = req.file.filename;
      const { userId, username } = req.user;
      console.log("UserId:", userId);
      console.log("Username:", username);
      const newPost = await this.postRepo.add(caption, image, userId, username);
      return res
        .status(201)
        .send({ msg: "Post added successfully", newPost: newPost });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updatePost(req, res, next) {
    try {
      const id = req.params.id;
      const { caption } = req.body;
      const image = req.file ? req.file.filename : null;
      const { userId } = req.user;
      const result = await this.postRepo.update(id, userId, caption, image);
      // console.log("Result:", result);
      return res.send({ msg: result.msg, updatePost: result.updatedPost });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      console.log("PostId:", id);
      const { userId } = req.user;
      const result = await this.postRepo.delete(id, userId);
      console.log("Result:", result);
      if (result.deletedCount > 0) {
        return res.status(200).send({ msg: "post deleted successfully" });
      }
      return res.status(404).send({ msg: "post not found" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
