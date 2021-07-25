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
    console.log("addNewUser in userServoceLib");
    this.allUsers.push(user);
    this.onUserListChanged();
  },
  removeUser(user) {
    console.log("removing a user in userService");
    for (let i = 0; i < this.allUsers.length; i++) {
      const u = this.allUsers[i];
      if (u.id === user.id) {
        console.log("removing user: " + u.name);
        this.allUsers.splice(i, 1);
        i--;
        // break;
      }
      console.log(this.allUsers);
      this.onUserListChanged();
    }
  },
  onUserListChanged() {
    console.log("Changing users in userService!");
  },
};
