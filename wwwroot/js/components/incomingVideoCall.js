import { signalrLib } from "../services/signalRService.js";

let mBody = document.createElement("div");
mBody.className = "modal-body";
mBody.textContent = "BODY";

let acceptButton = document.createElement("button");
acceptButton.classList = "btn btn-success";
acceptButton.textContent = "Accept";
acceptButton.setAttribute("data-bs-dismiss", "modal");
acceptButton.onclick = () => {
  console.log(`accepting the call`);
  signalrLib.sendAnswerToServer();
  incomingVideoCallModal.onAcceptCall();
};

let rejectButton = document.createElement("button");
rejectButton.classList = "btn btn-danger";
rejectButton.textContent = "Reject";
rejectButton.setAttribute("data-bs-dismiss", "modal");

let mFooter = document.createElement("div");
mFooter.className = "modal-footer";
mFooter.appendChild(acceptButton);
mFooter.appendChild(rejectButton);

let mContent = document.createElement("div");
mContent.className = "modal-content";
mContent.appendChild(mBody);
mContent.appendChild(mFooter);

let modalDialog = document.createElement("div");
modalDialog.className = "modal-dialog";
modalDialog.appendChild(mContent);

let root = document.createElement("div");
root.className = "modal fade";
console.log(`-------------dataset-------------`);
root.setAttribute("data-bs-backdrop", "static");
root.setAttribute("data-bs-keyboard", "false");

console.log(root.dataset);
root.appendChild(modalDialog);

export let incomingVideoCallModal = {
  div: root,
  onAcceptCall() {},
};
