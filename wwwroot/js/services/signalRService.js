"use strict";

import { userService } from "./userService.js";

var connection = new signalR.HubConnectionBuilder()
  .withUrl("/videChatHub")
  .build();
await connection
  .start()
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });

export let signalrLib = {
  async loginUser(userName) {
    let result = false;
    await connection.invoke("LoginUser", userName).then((user) => {
      if (user !== null) {
        userService.currentUser = user;
        result = true;
      }
    });
    return result;
  },
  async getAllUsers() {
    await connection.invoke("GetAllUsers").then((users) => {
      userService.allUsers = users;
      console.log(userService.allUsers);
    });
  },

  //-----------------------------------------------------------
  //              Events
  //-----------------------------------------------------------
  onNewUserLogin() {},
};

//-----------------------------------------------------------
//                All Invokes
//-----------------------------------------------------------

connection.on("newUserLogedin", function (newUser) {
  userService.addNewUser(newUser);
  signalrLib.onNewUserLogin();
});
