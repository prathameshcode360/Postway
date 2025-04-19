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
  static getOne(id) {
    const post = posts.find((p) => p.id == id);
    return post;
  }

  static getUserPosts(userId) {
    return posts.filter((p) => p.userId == userId);
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
  static update(id, caption, image, userId) {
    const index = posts.findIndex((p) => p.id == id && p.userId == userId);

    if (index !== -1) {
      posts[index].caption = caption || posts[index].caption;
      posts[index].image = image || posts[index].image;

      return posts[index];
    } else {
      return null;
    }
  }
  static delete(id, userId) {
    const index = posts.findIndex((p) => p.id == id && p.userId == userId);
    if (index !== -1) {
      posts.splice(index, 1);
      return "post deleted successfully";
    } else {
      return "post not found";
    }
  }
}
let posts = [
  new PostModel(1, "first-post-user1", "one.jpg", 1, "user1"),
  new PostModel(2, "second-post-user1", "two.jpg", 1, "user1"),
];
