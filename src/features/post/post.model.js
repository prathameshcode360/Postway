export default class PostModel {
  constructor(id, caption, image, userId, username) {
    this.id = id;
    this.caption = caption;
    this.image = image;
    this.userId = userId;
    this.username = username;
  }
  static getAll() {
    return posts;
  }

  static add(caption, image, userId, username) {
    const newPost = new PostModel(
      posts.length + 1,
      caption,
      image,
      userId,
      username
    );
    posts.push(newPost);
    return newPost;
  }
}
let posts = [
  new PostModel(1, "first-post-user1", "one.jpg", 1, "user1"),
  new PostModel(2, "second-post-user1", "two.jpg", 1, "user1"),
];
