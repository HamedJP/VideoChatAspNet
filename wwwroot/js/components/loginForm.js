export let loginForm = document.createElement("div");
let div = document.createElement("div");
// div.className = "mb-3";
loginForm.className = "border border-primary rounded-3";

let form = document.createElement("form");
form.classList = "modal-dialog";

let userIput = document.createElement("input");
userIput.type = "text";
userIput.placeholder = "نام کاربری";
userIput.className = "form-control";

let submit = document.createElement("button");
submit.textContent = "ورود";
submit.classList = "btn btn-primary";

form.appendChild(userIput);
form.appendChild(submit);
loginForm.appendChild(form);

// loginForm.event
form.onsubmit = () => {
  event.preventDefault();
  onLoginUser();
};
function onLoginUser() {
  console.log("login in the form");
}
