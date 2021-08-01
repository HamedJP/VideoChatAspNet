import { userService } from "./userService.js";

const localConnection = new RTCPeerConnection();
let devices = await navigator.mediaDevices.enumerateDevices();
console.log(devices);

let cameras = [];
devices.forEach((d) => {
  if (d.kind === "videoinput") cameras.push(d);
});

console.log(cameras);

localConnection.onicecandidate = (e) => {
  console.log(`on new ICE candidate!`);
  webRtcLib.localConnectionDescription = JSON.stringify(
    localConnection.localDescription
  );
  webRtcLib.onOfferIsReady();
};
localConnection.ontrack = (e) => {
  console.log("Recieving new track");
  console.log(e);
  webRtcLib.incomingVideoSteam = e.streams[0];
  webRtcLib.onStreamIncomingVideo();
};

let sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
sendChannel.onopen = (e) => {
  console.log("open!!!!");
};
sendChannel.onclose = (e) => console.log("closed!!!!!!");
localConnection.ondatachannel = (e) => {
  // console.log(`on data channel event`);
  sendChannel = e.channel;
};

localConnection
  .createOffer()
  .then((o) => localConnection.setLocalDescription(o));

export let webRtcLib = {
  offer: String,
  answer: String,
  isAnswerReady: false,
  localConnectionDescription: String,
  seflVideoStream: MediaStream,
  incomingVideoSteam: MediaStream,
  recieveOffer(offer) {
    this.isAnswerReady = false;
    console.log(`Recieve offer from server`);
    console.log(offer);
    this.offer = JSON.parse(offer);
    localConnection
      .setRemoteDescription(this.offer)
      .then((a) => console.log("done Recieve offer from server"));
    localConnection
      .createAnswer()
      .then((a) => localConnection.setLocalDescription(a))
      .then((a) => {
        this.answer = JSON.stringify(localConnection.localDescription);
        this.isAnswerReady = true;
        this.onNewIncomingVideoCall();
      });
  },

  recieveAnswer(answer) {
    let jAnswer = JSON.parse(answer);
    console.log(`Answer recieved`);
    console.log(answer);
    localConnection.setRemoteDescription(jAnswer).then((e) => {
      console.log(`done in answer`);
      console.log(e);
    });
  },

  sendTestMessage() {
    // sendChannel.send(
    //   `Hello from ${userService.currentUser.name} to ${userService.callerUser.name} TO ${userService.recieverUser.name}`
    // );
    console.log(this.seflVideoStream.getTracks());
    this.seflVideoStream.getTracks().forEach((track) => {
      console.log(track);

      localConnection.addTrack(track);
    });
  },

  itirateCameras() {
    if (cameras.length > 1) {
      const tmp = cameras[0];
      for (let i = 1; i < cameras.length; i++) {
        cameras[i - 1] = cameras[i];
      }
      cameras[cameras.length - 1] = tmp;
    }
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
        webRtcLib.seflVideoStream = stream;
        webRtcLib.onSelfVideoIsReady();
      });
  },

  onOfferIsReady() {},
  onNewIncomingVideoCall() {},
  onSelfVideoIsReady() {},
  onStreamIncomingVideo() {},
};

webRtcLib.itirateCameras();
