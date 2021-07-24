import { sidebar } from "./components/sidebar.js";
import { chatView } from "./components/chatView.js";
import * as signalR from "./services/signalRService.js";
import { loginPage } from "./components/loginPage.js";
import { userService } from "./services/userService.js";

let app = document.getElementById("App");

app.appendChild(loginPage.div());

loginPage.onLoginUser = () => {
  console.log(`in index page: ${userService.uname}`);
};

// app.appendChild(sidebar);
// app.appendChild(chatView);

// console.log(app);
