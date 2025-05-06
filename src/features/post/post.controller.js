import NewPostRepo from "./post.newRepo.js";

export default class PostController {
  constructor() {
    this.postRepo = new NewPostRepo();
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
      const post = await this.postRepo.getOne(id);
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
      const updatedPost = await this.postRepo.update(
        id,
        userId,
        caption,
        image
      );
      console.log("updatedPost:", updatedPost);
      if (!updatedPost) {
        return res.status(404).send({ msg: "Post not found" });
      }
      return res
        .status(200)
        .send({ msg: "post updated successfully", updatedPost: updatedPost });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deletePost(req, res, next) {
    try {
      const id = req.params.id;
      // console.log("PostId:", id);
      const { userId } = req.user;
      const deletedPost = await this.postRepo.delete(id, userId);
      if (!deletedPost) {
        return res.status(404).send({ msg: "Post not found" });
      }
      return res
        .status(200)
        .send({ msg: "Post deleted successfully", deletedPost: deletedPost });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
