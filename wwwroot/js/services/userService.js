import { User } from "../Models/user.js";

export let userService = {
  selectedUserToCall: User,
  currentUser: User,

  callerUser: User,
  recieverUser: User,
  otherUser: User,

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
  setCallerUser(callerUserId) {
    this.allUsers.forEach((u) => {
      if (u.id === callerUserId) {
        this.callerUser = u;
      }
    });
  },
  setRecieverUser(recieverUserId) {
    this.allUsers.forEach((u) => {
      if (u.id === recieverUserId) {
        this.recieverUser = u;
      }
    });
  },

  //----------------------------------------------------------------
  //                    Events
  //----------------------------------------------------------------
  onUserListChanged() {
    console.log("Changing users in userService!");
  },
  onUserSelectedToCall() {},
};
