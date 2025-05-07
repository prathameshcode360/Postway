import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
const LikeModel = mongoose.model("likes", likeSchema);
export default LikeModel;
