"use strict";

import { userService } from "./userService";

var connection = new signalR.HubConnectionBuilder()
  .withUrl("/videChatHub")
  .build();
await connection
  .start()
  .then(() => console.log("is it conneted???"))
  .catch((err) => {
    console.error(err);
  });
// let response =
connection.invoke("LoginUser", "Hamed").then((r) => {
  console.log(r);
});

export let signalrLib = {
  loginUser(userName) {
    connection.invoke("LoginUser", "Hamed").then((user) => {
      if (user !== null) {
        userService.currentUser = user;
        console.log(user);
        return true;
      }
    });
    return false;
  },
};
