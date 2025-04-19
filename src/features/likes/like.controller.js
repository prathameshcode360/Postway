import LikeModel from "./like.model.js";

export default class LikeController {
  getAllLikes(req, res, next) {
    try {
      const postId = req.params.id;
      let likes = LikeModel.getAll(postId);
      if (likes.length <= 0) {
        return res.status(404).send({ msg: "No likes found for this post" });
      }
      return res.status(200).send({ Total: likes.length, likes });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  toggleLike(req, res, next) {
    try {
      const postId = req.params.id;
      const { userId } = req.user;
      const result = LikeModel.toggle(Number(postId), userId);
      return res.status(200).send({ msg: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
