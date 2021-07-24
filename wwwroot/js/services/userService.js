import { User } from "../Models/user.js";

export let userService = {
  uname: "",
  currentUser: User,
  allUsers: [],
  addNewUser(user) {
    this.allUsers.push(user);
  },
};
