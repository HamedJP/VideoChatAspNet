"use strict";

import { userService } from "./userService.js";
import { webRtcLib } from "./webrtcService.js";

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
      // userService.allUsers = users;
      userService.setAllUsers(users);
      console.log(userService.allUsers);
    });
  },
  sendOfferToServer() {
    console.log(`sendong offer to server:`);
    console.log(webRtcLib.localConnectionDescription);
    connection.invoke(
      "RecieveOfferFromClient",
      userService.currentUser.id,
      userService.selectedUserToCall.id,
      webRtcLib.localConnectionDescription
    );
  },
  sendAnswerToServer() {
    console.log(`sending answer to server:`);
    console.log(webRtcLib.answer);
    connection.invoke(
      "RecieveAnswerFromClient",
      userService.callerUser.id,
      userService.recieverUser.id,
      webRtcLib.answer
    );
  },

  //-----------------------------------------------------------
  //              Events
  //-----------------------------------------------------------
};

//-----------------------------------------------------------
//                All Invokes
//-----------------------------------------------------------

connection.on("newUserLogedIn", function (newUser) {
  console.log("newUserLogedIn");
  let isNewUser = true;
  console.log(newUser);
  userService.allUsers.forEach((u) => {
    if (u.id === newUser.id) {
      console.log("user is updating");
      isNewUser = false;
      u.Name = newUser.Name;
    }
  });
  if (isNewUser === true) userService.addNewUser(newUser);
});

connection.on("userLeft", function (newUser) {
  console.log("userLeft");
  console.log(newUser);
  userService.removeUser(newUser);
});

connection.on(
  "recieveOfferFromServer",
  function (callerUserId, recieverUserId, offer) {
    userService.setCallerUser(callerUserId);
    userService.setRecieverUser(recieverUserId);
    webRtcLib.recieveOffer(offer);
  }
);

connection.on(
  "recieveAnswerFromServer",
  function (callerUserId, recieverUserId, answer) {
    console.log(`answer is recieved in signalR`);
    webRtcLib.recieveAnswer(answer);
  }
);
