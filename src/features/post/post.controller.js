import PostModel from "./post.model.js";

export default class PostController {
  getPosts(req, res) {
    try {
      let posts = PostModel.getAll();
      return res.status(200).send({ posts });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal Server Error" });
    }
  }
  createPost(req, res) {
    try {
      const { caption, image } = req.body;
      const { userId, username } = req.user;
      const newPost = PostModel.add(caption, image, userId, username);
      return res
        .status(201)
        .send({ msg: "Post added successfully", newPost: newPost });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal Server Error" });
    }
  }
}
