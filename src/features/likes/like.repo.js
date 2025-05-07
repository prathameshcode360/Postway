import LikeModel from "./like.schemas.js";

export default class LikeRepo {
  // to get all likes for a post(specific to one post)
  async getAll(postId) {
    try {
      let likes = await LikeModel.find({ postId: postId });
      return likes;
    } catch (error) {
      console.log("Error while getting all likes for a post", error);
    }
  }
  //   to toggle like status for a post
  async toggle(postId, userId, username) {
    try {
      const existingLike = await LikeModel.findOne({
        postId: postId,
        userId: userId,
      });
      if (existingLike) {
        await LikeModel.deleteOne({
          postId: postId,
          userId: userId,
        });
        return "Like removed successfully";
      } else {
        const newLike = new LikeModel({
          postId: postId,
          userId: userId,
          username: username,
        });
        await newLike.save();
        return "Like added successfully";
      }
    } catch (error) {
      console.log("Error while toggling like status", error);
    }
  }
}
