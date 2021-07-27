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
  // signalrLib.sendOfferToServer();
  let mdal = new bootstrap.Modal(incomingVideoCallModal.div);
  mdal.show();
  console.log("-------------------------------------------------------");
  console.log(mdal);
  console.log("-------------------------------------------------------");
};

userService.onUserSelectedToCall = () => {
  console.log(`lets call ${userService.selectedUserToCall.name}`);
};

chatView.appendChild(videoCallButton);
chatView.appendChild(incomingVideoCallModal.div);

userService.onUserSelectedToCall = () => {
  if (userService.selectedUserToCall === null) {
    videoCallButton.disabled = true;
  } else {
    videoCallButton.disabled = false;
  }
};

webRtcLib.onOfferIsReady = () => {
  console.log("Offer is ready");
};
