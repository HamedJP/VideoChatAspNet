import { User } from "../Models/user.js";
import { incomingVideoCallModal } from "./incomingVideoCall.js";
import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";
import { signalrLib } from "../services/signalRService.js";

export let videoCallView = document.createElement("div");

let msg = document.createElement("p");
msg.className = "msg";

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
  msg.textContent = `Cameers: ${webRtcLib.cams.length}\n${webRtcLib.cams[0]}\n${webRtcLib.cams[1]}`;
  webRtcLib.itirateCameras();
};

let endVideoCallButton = document.createElement("button");
endVideoCallButton.classList = "endCallButton";
endVideoCallButton.onclick = () => {
  webRtcLib.closeConnection();
};

videoCallView.appendChild(guessViewArea);
videoCallView.appendChild(selfViewArea);
// videoCallView.appendChild(msg);
videoCallView.appendChild(changeCameraButton);
videoCallView.appendChild(endVideoCallButton);
