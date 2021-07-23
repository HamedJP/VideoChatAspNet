"use strict";

var connection = new signalR.HubConnectionBuilder()
  .withUrl("/videChatHub")
  .build();
await connection
  .start()
  .then(() => console.log("is it conneted???"))
  .catch((err) => {
    console.error(err);
  });
// let response =
connection.invoke("LoginUser", "Hamed").then((r) => {
  console.log(r);
});

let signalrLib = {
  loginUser(userName) {
    connection.invoke("LoginUser", "Hamed").then((r) => {
      console.log(r);
    });
  },
};
