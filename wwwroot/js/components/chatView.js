import { User } from "../Models/user.js";
import { incomingVideoCallModal } from "./incomingVideoCall.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";
import { signalrLib } from "../services/signalRService.js";

export let chatView = document.createElement("div");
chatView.classList = "col";
// chatView.style = "background:orange;position: absolute;";
chatView.style = "background:orange;";

let videoCallButton = document.createElement("button");
// videoCallButton.textContent = "\u260E";
videoCallButton.textContent = "📷";
// videoCallButton.disabled = true;
videoCallButton.classList = "callVideoButton";
videoCallButton.classList = "callButton";
videoCallButton.onclick = () => {
  console.log(`calling ${userService.selectedUserToCall.name}`);
  userService.callerUser = userService.currentUser;
  userService.recieverUser = userService.selectedUserToCall;
  userService.otherUser = userService.selectedUserToCall;
  // signalrLib.sendOfferToServer();
  webRtcLib.createOffer();
};

let changeCameraButton = document.createElement("button");
changeCameraButton.textContent = "🗘";
changeCameraButton.onclick = () => {
  webRtcLib.itirateCameras();
};

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
selfViewArea.onclick = () => {
  console.log(`sending message?`);
  webRtcLib.sendTestMessage();
};

chatView.appendChild(videoCallButton);
chatView.appendChild(changeCameraButton);
// chatView.appendChild(incomingVideoCallModal.div);
chatView.appendChild(guessViewArea);
chatView.appendChild(selfViewArea);

userService.onUserSelectedToCall = () => {
  // if (userService.selectedUserToCall === null) {
  //   videoCallButton.disabled = true;
  // } else {
  //   videoCallButton.disabled = false;
  // }
};

// webRtcLib.onOfferIsReady = () => {
// console.log("Offer is ready");
// };
// webRtcLib.onStreamIncomingVideo = () => {
//   console.log(`stream the incoming video`);
//   guessViewArea.srcObject = webRtcLib.incomingVideoSteam;
// };
