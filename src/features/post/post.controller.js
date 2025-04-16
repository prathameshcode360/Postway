import PostModel from "./post.model.js";

export default class PostController {
  getPosts(req, res, next) {
    try {
      let posts = PostModel.getAll();
      return res.status(200).send({ posts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  getOnePost(req, res, next) {
    try {
      const id = req.params.id;
      const post = PostModel.getOne(id);
      if (!post) {
        return res.status(404).send({ msg: "Post not found" });
      }
      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  getUserPosts(req, res, next) {
    try {
      const { userId } = req.user;
      let userPosts = PostModel.getUserPosts(userId);
      if (userPosts.length === 0) {
        return res.status(404).send({ msg: "No post found for this user" });
      }
      return res.status(200).send({ userPosts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  createPost(req, res, next) {
    try {
      const { caption } = req.body;
      const image = req.file.filename;
      const { userId, username } = req.user;
      const newPost = PostModel.add(caption, image, userId, username);
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
      const updatedData = req.body;
      const { userId } = req.user;
      const updatedPost = PostModel.update(id, updatedData, userId);
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
