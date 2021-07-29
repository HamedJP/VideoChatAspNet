import { userService } from "./userService.js";

const localConnection = new RTCPeerConnection();

localConnection.onicecandidate = (e) => {
  // console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
  webRtcLib.localConnectionDescription = JSON.stringify(
    localConnection.localDescription
  );
  // webRtcLib.offer = JSON.stringify(localConnection.localDescription);
  webRtcLib.onOfferIsReady();
};

let sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
sendChannel.onopen = (e) => console.log("open!!!!");
sendChannel.onclose = (e) => console.log("closed!!!!!!");

localConnection.ondatachannel = (e) => {
  // const receiveChannel = e.channel;
  // receiveChannel.onmessage = (e) =>
  //   console.log("messsage received!!!" + e.data);
  // receiveChannel.onopen = (e) => console.log("open!!!!");
  // receiveChannel.onclose = (e) => console.log("closed!!!!!!");
  // sendChannel = receiveChannel;
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
        // console.log(this.answer);
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
};
