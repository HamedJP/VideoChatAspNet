import { User } from "../Models/user.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";

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
};

userService.onUserSelectedToCall = () => {
  console.log(`lets call ${userService.selectedUserToCall.name}`);
};

chatView.appendChild(videoCallButton);

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
