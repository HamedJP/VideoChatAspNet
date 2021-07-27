import { User } from "../Models/user.js";
import { incomingVideoCallModal } from "./incomingVideoCall.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";
import { signalrLib } from "../services/signalRService.js";

export let chatView = document.createElement("div");
chatView.classList = "col";
chatView.style = "background:orange";

let videoCallButton = document.createElement("button");
// videoCallButton.textContent = "\u260E";
videoCallButton.textContent = "📷";
videoCallButton.disabled = true;
videoCallButton.classList = "btn btn-info";
videoCallButton.onclick = () => {
  console.log(`calling ${userService.selectedUserToCall.name}`);
  userService.callerUser = userService.currentUser;
  userService.recieverUser = userService.selectedUserToCall;
  signalrLib.sendOfferToServer();
};

let test = document.createElement("button");
test.textContent = "hello";
test.classList = "btn btn-info";
test.onclick = () => {
  webRtcLib.sendTestMessage();
};

userService.onUserSelectedToCall = () => {
  // console.log(`lets call ${userService.selectedUserToCall.name}`);
};

chatView.appendChild(videoCallButton);
chatView.appendChild(incomingVideoCallModal.div);
chatView.appendChild(test);

userService.onUserSelectedToCall = () => {
  if (userService.selectedUserToCall === null) {
    videoCallButton.disabled = true;
  } else {
    videoCallButton.disabled = false;
  }
};

webRtcLib.onOfferIsReady = () => {
  // console.log("Offer is ready");
};
webRtcLib.onNewIncomingVideoCall = () => {
  let mdal = new bootstrap.Modal(incomingVideoCallModal.div);
  mdal.show();
};
