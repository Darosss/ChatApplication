var socket = io();
var formChat = document.getElementById("chat-form");
var textareaChat = document.querySelector("textarea");

formChat.addEventListener("submit", function (e) {
  e.preventDefault();
  if (textareaChat.value) {
    socket.emit(
      "chat message",
      textareaChat.value,
      new Date().toISOString().split("T")[1].split(".")[0]
    );
    textareaChat.value = "";
  }
});
socket.on("chat message", function (msg, msgDate) {
  window.scrollTo(0, document.body.scrollHeight);
  console.log(msg, msgDate);
  //TODOfrom user where he used chat
  let msgDest = document.getElementById("chat-window");
  //
  addMessageToChatbox(msgDest, msg, msgDate);
});

function addMessageToChatbox(box, msg, date) {
  var msgBox = messageFormat("user", msg, date);
  box.innerHTML = box.innerHTML + msgBox;
}

function messageFormat(user, msg, time) {
  let msgBox = `<div class="message-div">
    <span class="message-container">
      <span class="time">${time}</span>
      <span class="username">${user}:</span>
      ${msg}
    </span>
  </div>`;

  return msgBox;
}
