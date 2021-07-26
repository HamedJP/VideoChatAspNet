import { User } from "../Models/user.js";

export let userService = {
  selectedUserToCall: User,
  currentUser: User,
  allUsers: [User],
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
  selectUserToCall(id) {
    this.selectedUserToCall = null;
    let sId = -1;
    this.allUsers.forEach((u) => {
      if (u.id === id) {
        this.selectedUserToCall = u;
        sId = u.id;
      }
    });
    this.onUserSelectedToCall();
    return sId;
  },

  onUserSelectedToCall() {},
};
