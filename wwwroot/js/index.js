import { sidebar } from "./components/sidebar.js";
import { chatView } from "./components/chatView.js";
// import * as signalR from "./services/signalRService.js";
import { signalrLib } from "./services/signalRService.js";
import { loginPage } from "./components/loginPage.js";
import { userService } from "./services/userService.js";

let app = document.getElementById("App");
let isLogin;
let rootDiv = document.createElement("div");
rootDiv.className = "row";
app.appendChild(rootDiv);

function showLoginPage() {
  rootDiv.innerHTML = "";
  rootDiv.appendChild(loginPage.div());
}
function showUsersList() {
  signalrLib.getAllUsers();
  rootDiv.innerHTML = "";
  rootDiv.appendChild(sidebar.div);
}

window.addEventListener("popstate", (e) => {
  switch (e.state.page) {
    case "login":
      showLoginPage();
      break;
    case "usersList":
      if (userService.currentUser === null) {
        showLoginPage();
        break;
      }
      showUsersList();
      break;
    case "chatPage":
      if (userService.currentUser === null) {
        showLoginPage();
        break;
      }
      rootDiv.innerHTML = "";
      rootDiv.appendChild(chatView);
      break;
    default:
      break;
  }
});

userService.onUserLogin = () => {
  showUsersList();
  history.pushState({ page: "usersList" }, `Selected: Chatroom`, `./room`);
};

userService.onUserSelectedToCall = () => {
  rootDiv.innerHTML = "";
  rootDiv.appendChild(chatView);
  history.pushState(
    { page: "chatPage" },
    `Selected: Chatroom`,
    `./chat/${userService.selectedUserToCall.name}`
  );
};

showLoginPage();
history.replaceState({ page: "login" }, "Default state", "./");
// console.log(app);
