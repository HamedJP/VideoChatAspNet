import { sidebar } from "./components/sidebar.js";
import { chatView } from "./components/chatView.js";
// import * as signalR from "./services/signalRService.js";
import { signalrLib } from "./services/signalRService.js";
import { loginPage } from "./components/loginPage.js";
import { userService } from "./services/userService.js";

let app = document.getElementById("App");

let rootDiv = document.createElement("div");
rootDiv.className = "row";
app.appendChild(rootDiv);

rootDiv.appendChild(loginPage.div());

loginPage.onLoginUser = async () => {
  console.log(`in index page: ${userService.uname}`);
  let isLogin = await signalrLib.loginUser(userService.uname);
  console.log(isLogin);
  if (isLogin) {
    signalrLib.getAllUsers();
    rootDiv.innerHTML = "";
    rootDiv.appendChild(sidebar.div);
    rootDiv.appendChild(chatView);
  }
};

// console.log(app);
