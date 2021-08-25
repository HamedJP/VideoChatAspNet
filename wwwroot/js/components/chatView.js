import { User } from "../Models/user.js";
import { incomingVideoCallModal } from "./incomingVideoCall.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";
import { signalrLib } from "../services/signalRService.js";

export let chatView = document.createElement("div");
chatView.classList = "col chatView";
chatView.id = "chatView";

let name = document.createElement("p");
name.textContent = userService.selectedUserToCall.name;
name.className = "callUsername";

let videoCallButton = document.createElement("button");

videoCallButton.classList = "callVideoButton col";
videoCallButton.onclick = () => {
  console.log(`click the call`);
  console.log(`calling ${userService.selectedUserToCall.name}`);
  userService.callerUser = userService.currentUser;
  userService.recieverUser = userService.selectedUserToCall;
  userService.otherUser = userService.selectedUserToCall;
  ///////////////////////// signalrLib.sendOfferToServer();
  webRtcLib.createOffer();
};

// chatView.appendChild(name);
chatView.appendChild(videoCallButton);
