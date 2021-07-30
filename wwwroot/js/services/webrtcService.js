import { userService } from "./userService.js";

const localConnection = new RTCPeerConnection();

localConnection.onicecandidate = (e) => {
  webRtcLib.localConnectionDescription = JSON.stringify(
    localConnection.localDescription
  );
  webRtcLib.onOfferIsReady();
};

let sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
sendChannel.onopen = (e) => console.log("open!!!!");
sendChannel.onclose = (e) => console.log("closed!!!!!!");
sendChannel.localConnection.ondatachannel = (e) => {
  sendChannel = e.channel;
};

localConnection
  .createOffer()
  .then((o) => localConnection.setLocalDescription(o));

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    webRtcLib.seflVideoStream = stream;
    webRtcLib.onSelfVideoIsReady();
  });

export let webRtcLib = {
  offer: String,
  answer: String,
  isAnswerReady: false,
  localConnectionDescription: String,
  seflVideoStream: MediaStream,
  incomingVideoSteam: MediaStream,
  async recieveOffer(offer) {
    this.isAnswerReady = false;
    // console.log(`Recieve offer from server`);
    this.offer = JSON.parse(offer);
    localConnection
      .setRemoteDescription(this.offer)
      .then((a) => console.log("done"));
    await localConnection
      .createAnswer()
      .then((a) => localConnection.setLocalDescription(a))
      .then((a) => {
        this.answer = JSON.stringify(localConnection.localDescription);
        this.isAnswerReady = true;
      });
    this.onNewIncomingVideoCall();
  },

  async recieveAnswer(answer) {
    let jAnswer = JSON.parse(answer);
    console.log(`Answer recieved`);
    await localConnection
      .setRemoteDescription(jAnswer)
      .then((a) => console.log("done"));
  },

  sendTestMessage() {
    sendChannel.send(
      `Hello from ${userService.currentUser.name} to ${userService.callerUser.name} TO ${userService.recieverUser.name}`
    );
  },

  onOfferIsReady() {},
  onNewIncomingVideoCall() {},
  onSelfVideoIsReady() {},
};
