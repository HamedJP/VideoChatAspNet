const localConnection = new RTCPeerConnection();

localConnection.onicecandidate = (e) => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
  webRtcLib.localConnectionDescription = JSON.stringify(
    localConnection.localDescription
  );
  // webRtcLib.offer = JSON.stringify(localConnection.localDescription);
  webRtcLib.onOfferIsReady();
};

const sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
sendChannel.onopen = (e) => console.log("open!!!!");
sendChannel.onclose = (e) => console.log("closed!!!!!!");

localConnection.ondatachannel = (e) => {
  //   const receiveChannel = e.channel;
  //   receiveChannel.onmessage = (e) =>
  //     console.log("messsage received!!!" + e.data);
  //   receiveChannel.onopen = (e) => console.log("open!!!!");
  //   receiveChannel.onclose = (e) => console.log("closed!!!!!!");
  //   sendChannel = receiveChannel;
  sendChannel = e.channel;
};

localConnection
  .createOffer()
  .then((o) => localConnection.setLocalDescription(o));

export let webRtcLib = {
  offer: String,
  answer: String,
  localConnectionDescription: String,
  async recieveOffer(offer) {
    console.log(offer);
    this.offer = JSON.parse(offer);
    console.log(this.offer);
    localConnection
      .setRemoteDescription(this.offer)
      .then((a) => console.log("done"));
    await localConnection
      .createAnswer()
      .then((a) => localConnection.setLocalDescription(a))
      .then((a) => {
        this.answer = JSON.stringify(localConnection.localDescription);
        console.log(this.answer);
      });
    this.newIncomingVideoCall();
  },

  onOfferIsReady() {},
  newIncomingVideoCall() {},
};
