import LikeModel from "./like.model.js";

export default class LikeController {
  getAllLikes(req, res) {
    try {
      const postId = req.params.id;
      let likes = LikeModel.getAll(postId);
      if (likes.length <= 0) {
        return res.status(404).send({ msg: "No likes found for this post" });
      }
      return res.status(200).send({ likes });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
  toggleLike(req, res) {
    try {
      const postId = req.params.id;
      const { userId } = req.user;
      const result = LikeModel.toggle(Number(postId), userId);
      return res.status(200).send({ msg: result });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ msg: "Internal server error" });
    }
  }
}
