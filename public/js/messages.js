$(window).ready(function () {
  var socket = io({ autoConnect: true });
  let typingTime = 5000;
  let chatContainers = $(".chat-container");
  //Loop through all containers to set adequate sockets to chat rooms
  chatContainers.each(function () {
    let sendButton = document.querySelector(".btn-primary"),
      chatWindow = document.querySelector(".chat-window"),
      chatForm = document.querySelector(".chat-form"),
      chatTxtarea = document.querySelector("textarea"),
      joinButton = document.querySelector('button[id*="join"]'),
      leaveButton = document.querySelector('button[id*="leave"]'),
      roomID = "#" + $(this).attr("id"),
      usersList = document.querySelector(".user-list-window"),
      showUsersButton = document.querySelector(".btn-chat-users"),
      typingInChat = false,
      timeoutTyping = undefined;

    textareaEventListeners(chatTxtarea, sendButton);
    dynamicResizeTextarea(chatTxtarea);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    $(joinButton).on("click", function () {
      sendButton.style.display = "inline-block";
      joinLeaveRoom(this, leaveButton, "join room", roomID);
    });
    $(leaveButton).on("click", function () {
      joinLeaveRoom(this, joinButton, "leave room", roomID);
      sendButton.style.display = "none";
    });
    $(showUsersButton).on("click", function () {
      $(usersList).toggle();
    });
    //Submit form and send msg
    $(chatForm).on(
      "submit",
      { textarea: chatTxtarea, room: roomID },
      onSubmitMessage
    );
    //On key preess textarea(Typing user feature)
    $(chatTxtarea).on("keypress", function (e) {
      if (e.which != 13) {
        typingTimeout(roomID, (typingInChat = true));
        clearTimeout(timeoutTyping);
        timeoutTyping = setTimeout(
          typingTimeout,
          typingTime,

          roomID,
          (typingInChat = false)
        );
      } else {
        typingInChat = false;
        typingTimeout(roomID, typingInChat);
        clearTimeout(timeoutTyping);
      }
    });
  });
  //END For each chat room
  socket.on("chat message", function (data) {
    addMessageToChatbox(
      data.username,
      data.roomTarget + " .chat-window",
      data.msg,
      data.date.split("T")[1].split(".")[0]
    );
  });
  socket.on("connect", function () {});

  socket.on("user typing", (data) => {
    const chatInfo = document.querySelector(data.roomName + " .chat-info");
    if (!data.isTyping) {
      chatInfo.innerHTML = "";
    } else {
      chatInfo.innerHTML = `${data.username} is typing`;
    }
  });
  socket.on("user online room", function (data) {
    let roomUserList = document.querySelector(data.roomName + " .user-list");
    roomUserList.innerHTML = "";
    data.roomUsers.forEach((user) => {
      let userBtn = document.createElement("button");
      userBtn.textContent = user;
      userBtn.className = "btn-user";
      // userBtn.onclick = function () {
      //   // socket.emit("private msg", user, "randommsg");
      // };
      roomUserList.appendChild(userBtn);
    });
  });
  // socket.on("private msg", function (fromUser, msg) {
  //   console.log("PRIV MSG", fromUser, msg);
  // });
  function typingTimeout(room, typing) {
    socket.emit("user typing", {
      roomName: room,
      isTyping: typing,
    });
  }
  function joinLeaveRoom(btnPressed, btnToEnable, evnName, roomName) {
    socket.emit(evnName, { roomName: roomName });
    btnPressed.disabled = true;
    $(btnToEnable).removeAttr("disabled");
  }
  function onSubmitMessage(event) {
    event.preventDefault();
    let chatTextarea = event.data.textarea,
      roomName = event.data.room;

    if (!chatTextarea.value) return;

    socket.emit("chat message", {
      roomTarget: roomName,
      msg: chatTextarea.value,
    });
    chatTextarea.value = "";
  }
  function addMessageToChatbox(username, room, msg, date) {
    var msgBox = messageFormat(username, msg, date);
    roomTarget = document.querySelector(room);
    roomTarget.innerHTML += msgBox;
    roomTarget.scrollTop = roomTarget.scrollHeight;
  }
  function messageFormat(user, msg, time) {
    let msgBox = `
          <div class="message-div">
            <div class="message-container">
              <div class="time">${time}</div>
              <div class="username">${user}:</div>
              <div class="message">${msg}</div>
            </div>
          </div>`;
    return msgBox;
  }
  function dynamicResizeTextarea(textarea) {
    textarea.setAttribute(
      "style",
      "height:" + textarea.scrollHeight + "px;overflow-y:hidden;"
    );
  }
  function textareaEventListeners(textarea, btn) {
    textarea.addEventListener("input", textareaSizeDynamical, false);
    textarea.addEventListener("focus", onFocusEnterSend, false);
    textarea.sendButton = btn;
    textarea.addEventListener("focusout", onFocusOutDisableEnter, false);
  }
  function textareaSizeDynamical() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }

  function onFocusEnterSend() {
    this.addEventListener("keypress", enterToSendOnFocus);
  }
  function onFocusOutDisableEnter() {
    this.removeEventListener("keypress", onFocusEnterSend, true);
  }
  function enterToSendOnFocus(e) {
    if ((e.code == "Enter" || e.code == "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.sendButton.click();
    }
  }
});
