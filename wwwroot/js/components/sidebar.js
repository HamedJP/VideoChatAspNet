import { userService } from "../services/userService.js";

let selectedUserId = -1;

let sidebarDiv = document.createElement("div");

sidebarDiv.className =
  "col d-flex flex-column align-items-stretch flex-shrink-0 bg-white";
sidebarDiv.style = "background:yellow";

let title = document.createElement("h2");
title.textContent = "لیست کابران";
title.classList =
  "d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom";

let usersList = document.createElement("div");

usersList.classList =
  "list-group list-group-flush border-bottom scrollarea container";

// let allUsers = [1, 2, 3, 4, 5];
// let allUsers = userService.allUsers;
console.log(userService.allUsers);
showUsersInsidebarDiv(-1);

function showUsersInsidebarDiv() {
  // console.log(userId);
  usersList.innerHTML = "";
  // selectedUserId = userId;
  for (let i = 0; i < userService.allUsers.length; i++) {
    if (userService.allUsers[i].id !== userService.currentUser.id) {
      let callButton = document.createElement("button");
      callButton.textContent = "\u260E";
      callButton.classList = "btn btn-info";
      callButton.onclick = () => {
        console.log(`calling ${userService.allUsers[i].name}`);
      };

      let user = document.createElement("div");
      user.id = `${userService.allUsers[i].id}`;

      let p = document.createElement("p");
      p.textContent = `${userService.allUsers[i].name}`;
      p.classList = "col";
      user.appendChild(p);
      if (user.id === selectedUserId) {
        user.classList =
          "list-group-item list-group-item-action py-3 active lh-tight userContainer";
        user.appendChild(callButton);
      } else {
        user.classList =
          "list-group-item list-group-item-action py-3 lh-tight userContainer";
      }

      user.onclick = () => {
        if (selectedUserId === user.id) {
          selectedUserId = -1;
        } else {
          selectedUserId = user.id;
        }
        showUsersInsidebarDiv();
      };
      usersList.appendChild(user);
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
