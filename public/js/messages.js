(function () {
  var socket = io();
  var formChat = document.getElementById("chat-form");
  var textareaChat = document.querySelector("textarea");
  var infoChat = document.querySelector(".chat-info");
  var onlineUsers = document.querySelector(".user-list");

  socket.on("refresh users", function (onlineUsersList) {
    console.log(onlineUsersList);
    onlineUsers.innerHTML = "";
    onlineUsersList.forEach((user) => {
      onlineUsers.innerHTML += `${user}<br>`;
    });
  });
  socket.on("connect", function () {
    textareaChat.addEventListener("focus", function () {
      socket.emit("refresh users typing", socket.id.slice(15));
    });
    textareaChat.addEventListener("focusout", function () {
      socket.emit("remove user typing", socket.id.slice(15));
    });
    socket.emit("online");
  });

  formChat.addEventListener("submit", function (e) {
    e.preventDefault();
    if (textareaChat.value) {
      let msgDate = new Date();
      socket.emit("chat message", textareaChat.value, msgDate);
      msgDateFormat = msgDate.toISOString().split("T")[1].split(".")[0];
      addMessageToChatbox(
        socket.id.slice(15),
        document.getElementById("chat-window"),
        textareaChat.value,
        msgDateFormat
      );
      textareaChat.value = "";
    }
  });
  socket.on("chat message", function (msg, msgDate) {
    window.scrollTo(0, document.body.scrollHeight);
    //TODOfrom user where he used chat
    let msgDest = document.getElementById("chat-window");
    //
    msgDateFormat = msgDate.split("T")[1].split(".")[0];
    addMessageToChatbox("user", msgDest, msg, msgDateFormat);
  });

  function addMessageToChatbox(username, box, msg, date) {
    var msgBox = messageFormat(username, msg, date);
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
  //FIXME refresh typing users set for now fix later
  socket.on("refresh users typing", function (typingUsers) {
    infoChat.innerHTML = "";
    let typingUsersLength = typingUsers.length;
    let maxUsers = 2;
    for (let i = 0; i < typingUsersLength; i++) {
      if (i >= maxUsers) break;
      infoChat.innerHTML += typingUsers[i];
      if (typingUsersLength > 1 && i < typingUsersLength - 1)
        infoChat.innerHTML += ", ";
    }
    if (typingUsersLength == 1) infoChat.innerHTML += " is typing";
    if (typingUsersLength > maxUsers)
      infoChat.innerHTML += `and ${typingUsersLength - maxUsers} others `;
    if (typingUsersLength > 1) infoChat.innerHTML += ` are typing`;
  });
})();
