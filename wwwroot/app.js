var localVideo = document.getElementById("localVideo"),
  remoteVideo = document.getElementById("remoteVideo"),
  localVideoStream,
  remoteVideoStream,
  localConnection,
  remoteConnection;
async function cameraBtn() {
  localVideoStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  document.getElementById("localVideo").srcObject = localVideoStream;
  document.getElementById("createBtn").disabled = false;
  console.log(localVideoStream);
  startPeerConnection(localVideoStream);
}

function startPeerConnection(stream) {
  var configuration = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  };
  localConnection = new RTCPeerConnection({
    configuration: configuration,
    iceServers: [],
  });
  remoteConnection = new RTCPeerConnection(configuration);
  stream.getTracks().forEach(function (track) {
    localConnection.addTrack(track, stream);
  });

  remoteConnection.ontrack = function (e) {
    remoteVideo.srcObject = e.streams[0];
  };

  // Set up the ICE candidates for the two peers

  localConnection.onicecandidate = (e) =>
    !e.candidate ||
    remoteConnection.addIceCandidate(e.candidate).catch((e) => {
      console.error(e);
    });

  remoteConnection.onicecandidate = (e) =>
    !e.candidate ||
    localConnection.addIceCandidate(e.candidate).catch((e) => {
      console.error(e);
    });

  localConnection
    .createOffer()
    .then((offer) => localConnection.setLocalDescription(offer))
    .then(() =>
      remoteConnection.setRemoteDescription(localConnection.localDescription)
    )
    .then(() => remoteConnection.createAnswer())
    .then((answer) => remoteConnection.setLocalDescription(answer))
    .then(() =>
      localConnection.setRemoteDescription(remoteConnection.localDescription)
    )
    .catch((e) => {
      console.error(e);
    });
}

//----------------------------------------
var localConnection;
var configuration = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
};
//  1- request a call
async function call() {
  localConnection = new RTCPeerConnection({
    configuration: configuration,
    iceServers: [],
  });
  initialConnection();
}

async function acceptCall() {
  localConnection = new RTCPeerConnection(configuration);
}

// 1- initial local connection
async function initialConnection() {
  localVideoStream.getTracks().forEach(function (track) {
    localConnection.addTrack(track, localVideoStream);
  });

  localConnection.ontrack = function (e) {
    remoteVideo.srcObject = e.streams[0];
  };

  // Set up the ICE candidates for the two peers

  localConnection.onicecandidate = (e) =>
    !e.candidate ||
    remoteConnection.addIceCandidate(e.candidate).catch((e) => {
      console.error(e);
    });

  // remoteConnection.onicecandidate = (e) =>
  //   !e.candidate ||
  //   localConnection.addIceCandidate(e.candidate).catch((e) => {
  //     console.error(e);
  //   });
}
