import { User } from "../Models/user.js";
import { incomingVideoCallModal } from "./incomingVideoCall.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";
import { signalrLib } from "../services/signalRService.js";

let div = document.createElement("div");

div.classList = "col chatView";
div.id = "chatView";

let name = document.createElement("p");
name.textContent = "selectedUserToCall";
name.className = "callUsername";

let videoCallButton = document.createElement("button");

videoCallButton.classList = "callVideoButton col";
videoCallButton.onclick = () => {
  userService.callerUser = userService.currentUser;
  userService.recieverUser = userService.selectedUserToCall;
  userService.otherUser = userService.selectedUserToCall;
  ///////////////////////// signalrLib.sendOfferToServer();
  div.style = "background-color: orangered;";
  webRtcLib.createOffer();
};

div.appendChild(name);
div.appendChild(videoCallButton);

export function callWasRejected() {
  name.innerText = "The call was rejected";
  setTimeout(() => {
    webRtcLib.onEndingTheCall();
  }, 5000);
}

export let chatView = () => {
  name.textContent = userService.selectedUserToCall.name;
  return div;
};
