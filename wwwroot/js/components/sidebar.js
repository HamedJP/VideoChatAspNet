import { userService } from "../services/userService.js";

let selectedUserId = -1;

let sidebarDiv = document.createElement("div");

sidebarDiv.className = "col";
// sidebarDiv.className = "col d-none d-md-block";
// sidebarDiv.className = "col-sm d-flex flex-column align-items-stretch flex-shrink-0 bg-white";
// sidebarDiv.style = "background:yellow";

let title = document.createElement("h2");
title.textContent = "لیست کابران";
title.classList =
  "d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom";

let usersList = document.createElement("div");

usersList.classList =
  "list-group list-group-flush border-bottom scrollarea container";

console.log(userService.allUsers);
showUsersInsidebarDiv(-1);

function showUsersInsidebarDiv() {
  usersList.innerHTML = "";
  for (let i = 0; i < userService.allUsers.length; i++) {
    if (userService.allUsers[i].id !== userService.currentUser.id) {
      let userDiv = document.createElement("div");
      userDiv.id = `${userService.allUsers[i].id}`;

      let p = document.createElement("p");
      p.textContent = `${userService.allUsers[i].name}`;
      p.classList = "col";
      userDiv.appendChild(p);
      if (userDiv.id === selectedUserId) {
        userDiv.classList =
          "list-group-item list-group-item-action py-3 active lh-tight userContainer";
      } else {
        userDiv.classList =
          "list-group-item list-group-item-action py-3 lh-tight userContainer";
      }

      userDiv.onclick = () => {
        // going to chat view:

        if (selectedUserId === userDiv.id) {
          console.log("in sidebar: userService.selectUserToCall(-1)");
          selectedUserId = userService.selectUserToCall(-1);
        } else {
          selectedUserId = userService.selectUserToCall(userDiv.id);
        }
        showUsersInsidebarDiv();
      };
      usersList.appendChild(userDiv);
    }
  }
}

userService.onUserListChanged = () => {
  showUsersInsidebarDiv();
};

sidebarDiv.appendChild(title);
sidebarDiv.appendChild(usersList);

export let sidebar = {
  div: sidebarDiv,
};
