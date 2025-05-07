import FriendshipModel from "./friendship.schemas.js";

export default class FriendshipRepo {
  // to get all friends for a user
  async getAllFriends(userId) {
    try {
      const friendships = await FriendshipModel.find({
        $and: [
          {
            $or: [{ requester: userId }, { recipient: userId }],
          },
          { status: "accepted" },
        ],
      }).populate("requester recipient", "userName");

      // Extract actual friend
      const friends = friendships.map((friendship) => {
        // If requester is me, then friend is recipient
        if (friendship.requester._id.toString() === userId.toString()) {
          return friendship.recipient;
        } else {
          return friendship.requester;
        }
      });

      return friends;
    } catch (error) {
      console.log("Error while getting friends list", error);
      throw error;
    }
  }
  //   to send a friend request
  async sendFriendRequest(requesterId, recipientId) {
    try {
      const existingRequest = await FriendshipModel.findOne({
        $or: [
          { requester: requesterId, recipient: recipientId },
          { requester: recipientId, recipient: requesterId },
        ],
      });

      if (existingRequest) {
        return {
          msg: "Friend request already exists",
          friendRequest: existingRequest,
        };
      }

      const newFriendRequest = new FriendshipModel({
        requester: requesterId,
        recipient: recipientId,
      });

      await newFriendRequest.save();

      return {
        msg: "Friend request sent successfully",
        newFriendRequest,
      };
    } catch (error) {
      console.log("Error while sending friend request:", error);
    }
  }
  //   to get pending friend requests for a user
  async getPendingRequests(userId) {
    try {
      let pendingRequest = await FriendshipModel.find({
        recipient: userId,
        status: "pending",
      }).populate("requester", "userName");
      return pendingRequest;
    } catch (error) {
      console.log("Error while getting pending friend requests", error);
    }
  }
  //   to toggle friend request status(accept/reject)

  async toggle(requesterId, recipientId, status) {
    try {
      const existingRequest = await FriendshipModel.findOne({
        requester: requesterId,
        recipient: recipientId,
      });

      if (!existingRequest) {
        return {
          msg: "Friend request not found",
        };
      }
      existingRequest.status = status;
      await existingRequest.save();
      if (status === "accepted") {
        return {
          msg: "Friend request accepted successfully",
          friendRequest: existingRequest,
        };
      } else if (status === "rejected") {
        return {
          msg: "Friend request rejected successfully",
          friendRequest: existingRequest,
        };
      }
    } catch (error) {
      console.log("Error while toggling friend request status", error);
    }
  }
}
