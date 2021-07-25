import { User } from "../Models/user.js";

export let userService = {
  uname: "",
  currentUser: User,
  allUsers: [],
  setAllUsers(users) {
    this.allUsers = users;
    this.onUserListChanged();
  },
  addNewUser(user) {
    this.allUsers.push(user);
    this.onUserListChanged();
  },
  removeUser(user) {
    for (let i = 0; i < this.allUsers.length; i++) {
      const u = this.allUsers[i];
      if (u.id === user.id) {
        this.allUsers.splice(i, 1);
        i--;
        // break;
      }
    }
    this.onUserListChanged();
  },
  onUserListChanged() {
    console.log("Changing users in userService!");
  },
};
