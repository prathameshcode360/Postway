import CommentModel from "./comment.schemas.js";
import { ObjectId } from "mongodb";
export default class CommentRepo {
  // adding new comment(specific to one post and one user)
  async add(comment, postId, userId, username) {
    try {
      const newComment = new CommentModel({
        comment,
        postId,
        userId,
        username,
      });
      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      console.log("Error while adding comment:", error);
    }
  }
  //   getting all comments of one post(specific to one post)
  async getAll(postId) {
    try {
      let comments = await CommentModel.find({ postId: postId });
      return comments;
    } catch (error) {
      console.log("Error while getting all comments:", error);
    }
  }

  //   getting comments of user on one post(specificto one post and one user)
  async getOneUserComments(postId, userId) {
    try {
      let comments = await CommentModel.find({
        postId: postId,
        userId: userId,
      });
      return comments;
    } catch (error) {
      console.log("Error while getting one comment:", error);
    }
  }

  // deleting one comment of user one one post(specigicto one comment,one post and one user)
  async remove(commentId, userId) {
    try {
      let deletedComment = await CommentModel.findOneAndDelete({
        _id: new ObjectId(commentId),
        userId: userId,
      });
      return deletedComment;
    } catch (error) {
      console.log("Error while deteting comment:", error);
    }
  }

  //   updating one comment of user on one post(specific to one comment,one post and one user)

  async update(commentId, userId, newComment) {
    try {
      const comment = await CommentModel.findOne({
        _id: new ObjectId(commentId),
        userId: userId,
      });
      if (comment) {
        comment.comment = newComment || comment.comment;
        const updateComment = await comment.save();
        return updateComment;
      }
    } catch (error) {
      console.log("Error while updating comment:", error);
    }
  }
}
