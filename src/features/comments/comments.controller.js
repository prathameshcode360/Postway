import CommentRepo from "./comment.repo.js";

export default class CommentController {
  constructor() {
    this.commentRepo = new CommentRepo();
  }

  async addNewComment(req, res, next) {
    try {
      const { userId, username } = req.user;
      const { postId, comment } = req.body;
      const newComment = await this.commentRepo.add(
        comment,
        postId,
        userId,
        username
      );
      if (newComment) {
        return res
          .status(201)
          .send({ msg: "Comment added successfully", newComment: newComment });
      }
      return res.status(400).send({ msg: "Comment not added" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getComments(req, res, next) {
    try {
      const postId = req.params.id;
      let comments = await this.commentRepo.getAll(postId);
      if (comments.length === 0) {
        return res.status(404).send({ msg: "No comments found for this post" });
      }
      return res.status(200).send({ comments });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getOneUserComments(req, res, next) {
    try {
      const { userId } = req.user;
      const postId = req.params.id;
      const comments = await this.commentRepo.getOneUserComments(
        postId,
        userId
      );
      if (comments.length === 0) {
        return res
          .status(404)
          .send({ msg: "No comments found for the user on this post" });
      }
      return res.status(200).send({ comments });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeComment(req, res, next) {
    try {
      const id = req.params.id;
      const { userId } = req.user;
      const deletedComment = await this.commentRepo.remove(id, userId);
      if (!deletedComment) {
        return res.status(404).send({ msg: "Comment not found" });
      }
      return res.status(200).send({
        msg: "Comment deleted successfully",
        deletedComment: deletedComment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateComment(req, res, next) {
    try {
      const { userId } = req.user;
      const { newComment } = req.body;
      const id = req.params.id;
      const updatedComment = await this.commentRepo.update(
        id,
        userId,
        newComment
      );
      if (!updatedComment) {
        return res.status(404).send({ msg: "Comment not found" });
      }
      return res.status(201).send({
        msg: "Comment updated successfully",
        updatedComment: updatedComment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
