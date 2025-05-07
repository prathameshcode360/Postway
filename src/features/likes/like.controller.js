import LikeRepo from "./like.repo.js";

export default class LikeController {
  constructor() {
    this.likeRepo = new LikeRepo();
  }

  async getAllLikes(req, res, next) {
    try {
      const postId = req.params.id;
      let likes = await this.likeRepo.getAll(postId);
      if (likes.length === 0) {
        return res.status(404).send({ msg: "No likes found for this post" });
      }
      return res.status(200).send({ Total: likes.length, likes });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async toggleLike(req, res, next) {
    try {
      const postId = req.params.id;
      const { userId, username } = req.user;
      const result = await this.likeRepo.toggle(postId, userId, username);
      return res.status(200).send({ msg: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
