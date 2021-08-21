import { User } from "../Models/user.js";
import { incomingVideoCallModal } from "./incomingVideoCall.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";
import { signalrLib } from "../services/signalRService.js";

export let videoCallView = document.createElement("div");
// videoCallView.classList = "col";
// videoCallView.style = "background:orange;position: absolute;";
// videoCallView.style = "background:orange;";

let guessViewArea = document.createElement("video");
guessViewArea.classList = "guessViewArea";
webRtcLib.onStreamIncomingVideo = () => {
  console.log(`on recieving the income stream`);
  guessViewArea.srcObject = webRtcLib.incomingVideoSteam;
  guessViewArea.play();
};

let selfViewArea = document.createElement("video");
selfViewArea.textContent = "hello";
selfViewArea.classList = "selfViewArea";
webRtcLib.onSelfVideoIsReady = () => {
  selfViewArea.srcObject = webRtcLib.seflVideoStream;
  selfViewArea.play();
};

let changeCameraButton = document.createElement("button");
changeCameraButton.classList = "rotateCameraButton";
changeCameraButton.onclick = () => {
  webRtcLib.itirateCameras();
};

let endVideoCallButton = document.createElement("button");
endVideoCallButton.classList = "endCallButton";
endVideoCallButton.onclick = () => {};

videoCallView.appendChild(guessViewArea);
videoCallView.appendChild(selfViewArea);
videoCallView.appendChild(changeCameraButton);
videoCallView.appendChild(endVideoCallButton);

// userService.onUserSelectedToCall = () => {
// if (userService.selectedUserToCall === null) {
//   videoCallButton.disabled = true;
// } else {
//   videoCallButton.disabled = false;
// }
// };

// webRtcLib.onOfferIsReady = () => {
// console.log("Offer is ready");
// };
// webRtcLib.onStreamIncomingVideo = () => {
//   console.log(`stream the incoming video`);
//   guessViewArea.srcObject = webRtcLib.incomingVideoSteam;
// };
