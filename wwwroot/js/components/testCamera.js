// import { User } from "../Models/user.js";
// import { incomingVideoCallModal } from "./incomingVideoCall.js";
// import { userService } from "../services/userService.js";
// import { webRtcLib } from "../services/webrtcService.js";
// import { signalrLib } from "../services/signalRService.js";

let seflVideoStream;

let devices = await navigator.mediaDevices.enumerateDevices();

let cameras = [];
devices.forEach((d) => {
  if (d.kind === "videoinput") cameras.push(d);
});

function itirateCameras() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: cameras[0].deviceId,
      },
      audio: false,
    })
    .then((stream) => {
      console.log(`stream selfi: `);
      console.log(stream);
      seflVideoStream = stream;
    })
    .catch((err) => {
      console.log(err);
    });

  if (cameras.length > 1) {
    const tmp = cameras[0];
    for (let i = 1; i < cameras.length; i++) {
      cameras[i - 1] = cameras[i];
    }
    cameras[cameras.length - 1] = tmp;
  }
}

itirateCameras();

export let videoCallView = document.createElement("div");

let msg = document.createElement("p");
msg.className = "msg";

let guessViewArea = document.createElement("video");
guessViewArea.classList = "guessViewArea";
// webRtcLib.onStreamIncomingVideo = () => {
console.log(`on recieving the income stream`);
console.log(seflVideoStream);
guessViewArea.srcObject = seflVideoStream;
guessViewArea.muted = true;
guessViewArea.play();
// };

let selfViewArea = document.createElement("video");
selfViewArea.textContent = "hello";
selfViewArea.classList = "guessViewArea";

let changeCameraButton = document.createElement("button");
changeCameraButton.classList = "rotateCameraButton";
changeCameraButton.onclick = () => {
  msg.innerHTML = `Cameers:\n... ${cameras.length}\n...${cameras[0]}\n...${cameras[1]}`;
  itirateCameras();
  selfViewArea.srcObject = seflVideoStream;
  selfViewArea.play();
};

let play = document.createElement("button");
play.textContent = "Play";
play.style = `z-index: 2; 
  left: 53px;
  position: absolute;
  margin: 0;
  bottom: 5%;
  left: 80%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 170px;
  height: 70px;
`;
play.onclick = () => {
  selfViewArea.srcObject = seflVideoStream;
  selfViewArea.play();
};

// videoCallView.appendChild(guessViewArea);
videoCallView.appendChild(selfViewArea);
// videoCallView.appendChild(play);
videoCallView.appendChild(msg);
videoCallView.appendChild(changeCameraButton);
