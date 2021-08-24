/*tslint:disabled*/
import { userService } from "../services/userService.js";
// import {signalrLib} from "../services/signalRService.js";

let rootDiv = document.createElement("div");
let div = document.createElement("div");
// div.className = "mb-3";
rootDiv.className = "loginPage border border-primary modal-dialog rounded-3";
rootDiv.style = "";

let form = document.createElement("form");
form.classList = "modal-content loginForm";

let userIputDiv = document.createElement("div");
let userIput = document.createElement("input");
userIput.type = "text";
userIput.placeholder = "Usename";
userIput.className = "form-control";
userIputDiv.style = "margin:12px";
userIputDiv.appendChild(userIput);

let submitDiv = document.createElement("div");
let submit = document.createElement("button");
submit.textContent = "Login";
submit.classList = "btn btn-primary";
submitDiv.style = "margin:12px";
submitDiv.appendChild(submit);

form.appendChild(userIputDiv);
form.appendChild(submitDiv);
rootDiv.appendChild(form);

// rootDiv.event
form.onsubmit = () => {
  event.preventDefault();
  if (userIput.value !== "") {
    userService.loginUser(userIput.value);
  } else {
    userIput.placeholder = "please enter a username";
  }
};

export let loginPage = {
  div() {
    return rootDiv;
  },
  onLoginUser() {},
  getUserName() {
    return userIput.value;
  },
};
