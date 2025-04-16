export default class LikeModel {
  constructor(id, postId, userId) {
    this.id = id;
    this.postId = postId;
    this.userId = userId;
  }
  static getAll(postId) {
    return likes.filter((like) => like.postId == postId);
  }
  static toggle(postId, userId) {
    const existingLikeIndex = likes.findIndex(
      (like) => like.postId == postId && like.userId == userId
    );
    if (existingLikeIndex !== -1) {
      likes.splice(existingLikeIndex, 1);
      return "post unliked";
    } else {
      const newLike = new LikeModel(likes.length + 1, postId, userId);
      likes.push(newLike);
      return "Post liked";
    }
  }
}

let likes = [
  new LikeModel(1, 1, 1),
  new LikeModel(2, 1, 2),
  new LikeModel(3, 2, 1),
];

// id , postId , userID ;
// get/:postId retrive all like from post
// get/:toggle like status for specific post
