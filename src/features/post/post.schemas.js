import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  username: {
    type: String,
  },
});

const PostModel = mongoose.model("posts", postSchema);
export default PostModel;
