import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const CommentModel = mongoose.model("comments", commentSchema);
export default CommentModel;
