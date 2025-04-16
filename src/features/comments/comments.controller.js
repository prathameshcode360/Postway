import CommentModel from "./comments.model.js";

export default class CommentController {
  addNewComment(req, res) {
    try {
      const { userId } = req.user;
      const { postId, comment } = req.body;
      const result = CommentModel.add(postId, userId, comment);
      return res.send({ result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  getComments(req, res) {
    try {
      const postId = req.params.id;
      let comments = CommentModel.getAll(postId);
      if (comments.length <= 0) {
        return res.status(404).send({ msg: "No comments found for this post" });
      }
      return res.status(200).send({ comments });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  getOneComment(req, res) {
    try {
      const { userId } = req.user;
      const postId = req.params.id;
      const comment = CommentModel.getOne(postId, userId);
      if (!comment) {
        return res.status(404).send({ msg: "No comment found" });
      }
      return res.status(200).send({ comment });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  removeComment(req, res) {
    try {
      const id = req.params.id;
      const { userId } = req.user;
      const result = CommentModel.remove(id, userId);
      return res.send({ msg: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  updateComment(req, res) {
    try {
      const { userId } = req.user;
      const { postId, updatedComment } = req.body;
      const id = req.params.id;
      const comment = CommentModel.update(id, postId, userId, updatedComment);
      if (!comment) {
        return res.status(404).send({ msg: "Comment not found" });
      }
      return res
        .status(201)
        .send({ msg: "Comment updated successfully", comment });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}
