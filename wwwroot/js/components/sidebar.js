import { userService } from "../services/userService.js";
import { webRtcLib } from "../services/webrtcService.js";

let selectedUserId = -1;

let sidebarDiv = document.createElement("div");

sidebarDiv.className = "col";

let title = document.createElement("h2");
title.textContent = "Users";
title.classList =
  "d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom";

let usersList = document.createElement("div");

usersList.classList =
  "list-group list-group-flush border-bottom scrollarea container";

showUsersInSidebarDiv(-1);

function showUsersInSidebarDiv() {
  usersList.innerHTML = "";
  if (1<userService.allUsers.length) {
    for (let i = 0; i < userService.allUsers.length; i++) {
      if (userService.allUsers[i].id !== userService.currentUser.id) {
        let userDiv = document.createElement("div");
        userDiv.id = `${userService.allUsers[i].id}`;

        let p = document.createElement("p");
        p.textContent = `${userService.allUsers[i].name}`;
        p.classList = "col";
        userDiv.appendChild(p);
        // userDiv.appendChild(videoCallButton);
        if (userDiv.id === selectedUserId) {
          userDiv.classList =
            "list-group-item list-group-item-action py-3 active lh-tight userContainer";
        } else {
          userDiv.classList =
            "list-group-item list-group-item-action py-3 lh-tight userContainer";
        }

        userDiv.onclick = () => {
          selectedUserId = userService.selectUserToCall(userDiv.id);

          showUsersInSidebarDiv();
        };
        usersList.appendChild(userDiv);
      }
    }
  } else {
    let p=document.createElement("p")
    p.textContent="You are the only one who connected to this server. At least two users must be connected to be able to communicate through WenRTC."
    usersList.appendChild(p);
  }
}

userService.onUserListChanged = () => {
  showUsersInSidebarDiv();
};

sidebarDiv.appendChild(title);
sidebarDiv.appendChild(usersList);

export let sidebar = {
  div: sidebarDiv,
};
