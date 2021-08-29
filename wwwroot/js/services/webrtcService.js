import { signalrLib } from "./signalRService.js";

var configuration = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};
let mediaSource; //= new RTCRtpSender();

// let localConnection; //= new RTCPeerConnection({
let localConnection = new RTCPeerConnection({
  configuration: configuration,
  iceServers: [
    {
      urls: "stun:stunserver.example.org",
    },
  ],
});

let devices = await navigator.mediaDevices.enumerateDevices();

let cameras = [];
devices.forEach((d) => {
  if (d.kind === "videoinput") cameras.push(d);
});

// console.log(cameras);
async function initialLocalConnection() {
  localConnection = new RTCPeerConnection({
    configuration: configuration,
    iceServers: [
      {
        urls: "stun:stunserver.example.org",
      },
    ],
  });
  localConnection.onicecandidate = (e) => {
    console.log(`on new ICE candidate!`);
    webRtcLib.localConnectionDescription = JSON.stringify(
      localConnection.localDescription
    );
    // webRtcLib.onOfferIsReady();
    signalrLib.sendNewIceToServer(JSON.stringify(e.candidate));
  };

  localConnection.ontrack = (e) => {
    console.log("Recieving new track");
    console.log(e.streams);
    console.log(e.streams[0]);
    // console.log(webRtcLib.seflVideoStream);
    webRtcLib.incomingVideoSteam = e.streams[0];
    webRtcLib.onStreamIncomingVideo();
  };
  // console.log(webRtcLib.seflVideoStream);
  let trackss = await webRtcLib.seflVideoStream.getTracks();
  // console.log(trackss);
  trackss.forEach(function (track) {
    mediaSource = localConnection.addTrack(track, webRtcLib.seflVideoStream);
  });

  let sendChannel = localConnection.createDataChannel("sendChannel");
  sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
  sendChannel.onopen = (e) => {
    console.log("open!!!!");
    let screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    console.log(JSON.stringify(screenSize));
    sendChannel.send(JSON.stringify(screenSize));
  };
  sendChannel.onclose = (e) => {
    console.log("closed!!!!!!");
    try {
      localConnection.removeTrack(mediaSource);
    } catch (error) {
      console.log(`Error!`);
      console.log(error);
    }
    // sendChannel.onmessage = (e) => {
    //   console.log(`on message!!!`);
    // };

    webRtcLib.onEndingTheCall();
  };
  localConnection.ondatachannel = (e) => {
    sendChannel = e.channel;
  };
}

export let webRtcLib = {
  offer: String,
  answer: String,
  isAnswerReady: false,
  localConnectionDescription: String,
  seflVideoStream: MediaStream,
  incomingVideoSteam: MediaStream,
  cams: [],

  async createOffer() {
    this.cams = cameras;
    await initialLocalConnection();
    console.log(localConnection);
    localConnection
      .createOffer()
      .then((o) => localConnection.setLocalDescription(o))
      .then((a) => {
        this.localConnectionDescription = JSON.stringify(
          localConnection.localDescription
        );
        signalrLib.sendOfferToServer();
      });
  },

  recieveOffer(offer) {
    initialLocalConnection();

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
      webRtcLib.onCallAccepted();
    });
  },

  setNewRemoteIceCandidate(newRemoteIceCandidate) {
    newRemoteIceCandidate = JSON.parse(newRemoteIceCandidate);
    localConnection.addIceCandidate(newRemoteIceCandidate);
  },

  async getMedia() {
    webRtcLib.seflVideoStream = null;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: cameras[0].deviceId,
          width: {
            max: "640",
          },
          height: {
            max: "480",
          },
          frameRate: {
            max: "30",
          },
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

  async itirateCameras() {
    if (cameras.length > 1) {
      const tmp = cameras[0];
      for (let i = 1; i < cameras.length; i++) {
        cameras[i - 1] = cameras[i];
      }
      cameras[cameras.length - 1] = tmp;
    }
    await this.getMedia();
    // localConnection.removeTrack(mediaSource);

    let trackss = await webRtcLib.seflVideoStream.getTracks();
    trackss.forEach(function (track) {
      mediaSource.replaceTrack(track); // = localConnection.addTrack(track, webRtcLib.seflVideoStream);
    });
    webRtcLib.onSelfVideoIsReady();
  },

  closeConnection() {
    localConnection.removeTrack(mediaSource);
    localConnection.close();
  },

  onOfferIsReady() {},
  onNewIncomingVideoCall() {},
  onSelfVideoIsReady() {},
  onStreamIncomingVideo() {},
  onCallAccepted() {},
  onEndingTheCall() {},
};

webRtcLib.getMedia();
