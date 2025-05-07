import FriendshipRepo from "./friendship.repo.js";

export default class FriendshipController {
  constructor() {
    this.friendshipRepo = new FriendshipRepo();
  }
  async getAllFriends(req, res, next) {
    try {
      const { userId } = req.user;
      let friends = await this.friendshipRepo.getAllFriends(userId);
      if (friends.length === 0) {
        return res.status(200).send({ msg: "You have no friends yet" });
      }
      return res.status(200).send({
        msg: "Your Friend",
        friends: friends,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async sendFriendRequest(req, res, next) {
    try {
      const { userId } = req.user;
      const { recipientId } = req.body;
      const result = await this.friendshipRepo.sendFriendRequest(
        userId,
        recipientId
      );
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getPendingRequests(req, res, next) {
    try {
      const { userId } = req.user;
      let pendingRequests = await this.friendshipRepo.getPendingRequests(
        userId
      );
      if (pendingRequests.length === 0) {
        return res.status(404).send({ msg: "No pending requests found" });
      }
      return res
        .status(200)
        .send({ msg: "Requests Pending", pendingRequests: pendingRequests });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async toggleRequest(req, res, next) {
    try {
      const { userId } = req.user;
      const { requesterId, status } = req.body;
      const result = await this.friendshipRepo.toggle(
        requesterId,
        userId,
        status
      );
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
