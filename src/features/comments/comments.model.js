import PostModel from "../post/post.model.js";

export default class CommentModel {
  constructor(id, postId, userId, comment) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
    this.comment = comment;
  }
  static add(postId, userId, comment) {
    const post = PostModel.getAll().find(
      (p) => p.id == postId && p.userId == userId
    );
    if (post) {
      const newComment = new CommentModel(
        comments.length + 1,
        postId,
        userId,
        comment
      );
      comments.push(newComment);
      return newComment;
    } else {
      return "Post not found";
    }
  }
  // getting all comments for one post
  static getAll(postId) {
    return comments.filter((c) => c.postId == postId);
  }
  //   getting user comment on that post
  static getOne(postId, userId) {
    const comment = comments.find(
      (c) => c.postId == postId && c.userId == userId
    );
    return comment;
  }
}
let comments = [
  new CommentModel(1, 1, 1, "Nice-One!"),
  new CommentModel(2, 1, 2, "Good!"),
];
