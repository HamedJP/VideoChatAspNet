const localConnection = new RTCPeerConnection();

localConnection.onicecandidate = (e) => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
  webRtcLib.offer = JSON.stringify(localConnection.localDescription);
  webRtcLib.onOfferIsReady();
  console.log(webRtcLib.offer);
};

const sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
sendChannel.onopen = (e) => console.log("open!!!!");
sendChannel.onclose = (e) => console.log("closed!!!!!!");

localConnection.ondatachannel = (e) => {
  console.log("on datachannel creation!\nanswer was created");
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

  recieveOffer(offer) {
    this.offer = offer;
    localConnection
      .setRemoteDescription(offer)
      .then((a) => console.log("done"));
    await remoteConnection
      .createAnswer()
      .then((a) => remoteConnection.setLocalDescription(a))
      .then((a) => {
        this.answer = JSON.stringify(remoteConnection.localDescription);
        console.log(this.answer);
        this.onAnswerIsReady();
      });
  },

  onOfferIsReady() {},
  onAnswerIsReady() {},
};
