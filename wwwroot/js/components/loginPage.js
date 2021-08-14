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
userIput.placeholder = "نام کاربری";
userIput.className = "form-control";
userIputDiv.style = "margin:12px";
userIputDiv.appendChild(userIput);

let submitDiv = document.createElement("div");
let submit = document.createElement("button");
submit.textContent = "ورود";
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
    // userService.uname = userIput.value;
    // loginPage.onLoginUser();
    userService.loginUser(userIput.value);
  } else {
    userIput.placeholder = "لطفا یک نام کاربری وارد کنید";
    userIput.style = "color:red";
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
