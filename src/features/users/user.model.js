export default class UserModel {
  constructor(userName, email, password, _id) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this._id = _id;
  }
  static getAll() {
    return users;
  }
  static register(userName, password) {
    const newUser = new UserModel(users.length + 1, userName, password);
    users.push(newUser);
    return newUser;
  }
  static login(userName, password) {
    const user = users.find(
      (u) => u.userName == userName && u.password == password
    );
    return user;
  }
  static getOneUser(id) {
    const user = users.find((u) => u.id == id);
    return user;
  }
}

let users = [
  new UserModel(1, "user1", "user1"),
  new UserModel(2, "user2", "user2"),
];
