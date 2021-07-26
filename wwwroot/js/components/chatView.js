import { User } from "../Models/user.js";
import { userService } from "../services/userService.js";

export let chatView = document.createElement("div");
chatView.classList = "col";
chatView.style = "background:orange";

let videoCallButton = document.createElement("button");
// videoCallButton.textContent = "\u260E";
videoCallButton.textContent = "📷";
videoCallButton.classList = "btn btn-info";
videoCallButton.onclick = () => {
  console.log(`calling ${userService.selectedUserToCall.name}`);
};

userService.onUserSelectedToCall = () => {
  console.log(`lets call ${userService.selectedUserToCall.name}`);
};

chatView.appendChild(videoCallButton);
