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
      let userPosts = await this.postRepo.getUsersPosts(userId);
      if (userPosts.length === 0) {
        return res.status(404).send({ msg: "No post found for this user" });
      }
      return res.status(200).send({ userPosts });
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
  updatePost(req, res, next) {
    try {
      const id = req.params.id;
      const { caption } = req.body;
      const image = req.file ? req.file.filename : null;
      const { userId } = req.user;
      const updatedPost = PostModel.update(id, caption, image, userId);
      if (!updatedPost) {
        return res.status(404).send({ msg: "Post not found" });
      }
      return res.status(201).send({ msg: "Post Updated", updatedPost });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  deletePost(req, res, next) {
    try {
      const id = req.params.id;
      const { userId } = req.user;
      const result = PostModel.delete(id, userId);
      return res.send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
