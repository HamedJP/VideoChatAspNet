export let chatView = document.createElement("div");
chatView.classList = "col";
chatView.style = "background:orange";

let videoCallButton = document.createElement("button");
videoCallButton.textContent = "call me";

chatView.appendChild(videoCallButton);
