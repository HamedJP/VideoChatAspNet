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
  async sendOfferToServer() {
    console.log(`sendong offer to server:`);
    // await webRtcLib.createOffer();
    connection.invoke(
      "RecieveOfferFromClient",
      userService.currentUser.id,
      userService.selectedUserToCall.id,
      webRtcLib.localConnectionDescription
    );
  },
  sendAnswerToServer() {
    console.log(`sending answer to server:`);
    connection.invoke(
      "RecieveAnswerFromClient",
      userService.callerUser.id,
      userService.recieverUser.id,
      webRtcLib.answer
    );
  },

  sendNewIceToServer(iceCandidate) {
    connection.invoke(
      "NewIcecandidates",
      userService.otherUser.id,
      iceCandidate
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
  let isNewUser = true;
  userService.allUsers.forEach((u) => {
    if (u.id === newUser.id) {
      isNewUser = false;
      u.Name = newUser.Name;
    }
  });
  if (isNewUser === true) userService.addNewUser(newUser);
});

connection.on("userLeft", function (newUser) {
  userService.removeUser(newUser);
});

connection.on(
  "recieveOfferFromServer",
  function (callerUserId, recieverUserId, offer) {
    userService.setCallerUser(callerUserId);
    userService.setRecieverUser(recieverUserId);
    userService.otherUser = userService.callerUser;
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

connection.on("reciveNewIceCandidate", function (newRemoteIceCandidate) {
  webRtcLib.setNewRemoteIceCandidate(newRemoteIceCandidate);
});
