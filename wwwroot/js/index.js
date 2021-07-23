import { sidebar } from "./components/sidebar.js";
import { chatView } from "./components/chatView.js";
import * as signalR from "./services/signalRService.js";
import { loginForm } from "./components/loginForm.js";
let app = document.getElementById("App");

app.appendChild(loginForm);
// app.appendChild(sidebar);
// app.appendChild(chatView);

// console.log(app);
