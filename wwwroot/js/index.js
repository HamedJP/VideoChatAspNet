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

rootDiv.appendChild(loginPage.div());

window.addEventListener("popstate", (e) => {
  if (e.state.id === "login") {
    signalrLib.logOutUser();
    rootDiv.innerHTML = "";
    rootDiv.appendChild(loginPage.div());
  }
  // else if (userService.currentUser)
});

// loginPage.onLoginUser = async () => {
//   console.log(`in index page: ${userService.uname}`);
//   isLogin = await signalrLib.loginUser(userService.uname);
//   // console.log(isLogin);
//   if (isLogin) {
//     signalrLib.getAllUsers();
//     rootDiv.innerHTML = "";
//     rootDiv.appendChild(sidebar.div);
//     history.pushState({ id: "chatoom" }, `Selected: Chatroom`, `./room`);
//     // rootDiv.appendChild(chatView);
//   }
// };

userService.onUserLogin = () => {
  signalrLib.getAllUsers();
  rootDiv.innerHTML = "";
  rootDiv.appendChild(sidebar.div);
  history.pushState({ id: "chatoom" }, `Selected: Chatroom`, `./room`);
};

history.replaceState({ id: "login" }, "Default state", "./");
// console.log(app);
