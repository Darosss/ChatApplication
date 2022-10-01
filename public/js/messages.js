document.addEventListener("DOMContentLoaded", function (event) {
  var socket = io({ autoConnect: true });
  let typingTime = 5000;
  let chatContainers = document.getElementsByClassName("chat-container");
  let timeoutTyping = undefined,
    typingInChat = false;
  //Loop through all containers to set adequate sockets to chat rooms
  [...chatContainers].forEach((chat) => {
    let sendButton = chat.querySelector(".btn-primary"),
      chatWindow = chat.querySelector(".chat-window"),
      chatForm = chat.querySelector(".chat-form"),
      chatTxtarea = chat.querySelector("textarea"),
      joinButton = chat.querySelector('button[id*="join"]'),
      leaveButton = chat.querySelector('button[id*="leave"]'),
      roomID = "#" + chat.getAttribute("id");

    textareaEventListeners(chatTxtarea, sendButton);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    // Join appropriate room by this button
    joinButton.addEventListener("click", function () {
      sendButton.style.display = "inline-block";
      joinLeaveRoom(this, leaveButton, "join room", roomID);
    });
    // Leave appropriate room by this button
    leaveButton.addEventListener("click", function () {
      joinLeaveRoom(this, joinButton, "leave room", roomID);
      sendButton.style.display = "none";
    });
    //When submiting form prevent default and emit 'message' to socket
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      onSubmitMessage(chatTxtarea, roomID);
    });
    // On keypress at textarea emit 'typing' to socket
    chatTxtarea.addEventListener("keypress", function (e) {
      typingInfoOnKeypress(e, roomID);
    });
  });
  //END For each chat room

  //Function for 'emit' typing
  function typingInfoOnKeypress(event, room) {
    if (event.which != 13) {
      typingTimeout(room, (typingInChat = true));
      clearTimeout(timeoutTyping);
      timeoutTyping = setTimeout(
        typingTimeout,
        typingTime,
        room,
        (typingInChat = false)
      );
    } else {
      typingInChat = false;
      typingTimeout(room, typingInChat);
      clearTimeout(timeoutTyping);
    }
  }
  //Trigger when gets 'chat message'
  socket.on("chat message", function (data) {
    addMessageToChatbox(
      data.username,
      data.roomTarget + " .chat-window",
      data.msg,
      data.date.split("T")[1].split(".")[0]
    );
  });
  //Trigger when someone is typing in your room
  socket.on("user typing", (data) => {
    const chatInfo = document.querySelector(data.roomName + " .chat-info");
    if (!data.isTyping) {
      chatInfo.innerHTML = "";
    } else {
      chatInfo.innerHTML = `${data.username} is typing`;
    }
  });
  //Trigger when someone is going offline or online in room
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

  //Function that will disable 'typing' by user
  function typingTimeout(room, typing) {
    socket.emit("user typing", {
      roomName: room,
      isTyping: typing,
    });
  }
  //Join leave appropriate room
  function joinLeaveRoom(btnPressed, btnToEnable, evnName, roomName) {
    socket.emit(evnName, { roomName: roomName });
    btnPressed.disabled = true;
    btnToEnable.removeAttribute("disabled");
  }
  //Emit message to each room and emit
  function onSubmitMessage(textarea, room) {
    if (!textarea.value) return;

    socket.emit("chat message", {
      roomTarget: room,
      msg: textarea.value,
    });
    textarea.value = "";
  }
  //When gets message this function paste it to div
  function addMessageToChatbox(username, room, msg, date) {
    var msgBox = messageFormat(username, msg, date);
    roomTarget = document.querySelector(room);
    roomTarget.innerHTML += msgBox;
    roomTarget.scrollTop = roomTarget.scrollHeight;
  }
  //Message format
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

  //Textarea listeners fe. (dynamical resizing, enter to send message when focus etc.)
  function textareaEventListeners(textarea, btn) {
    textarea.addEventListener("input", textareaSizeDynamical, false);
    textarea.addEventListener("focus", onFocusEnterSend, false);
    textarea.sendButton = btn;
    textarea.addEventListener("focusout", onFocusOutDisableEnter, false);
  }
  //Dynamical resize textarea on texting
  function textareaSizeDynamical() {
    this.style.height = 0;
    this.style.height = this.scrollHeight + "px";
  }
  //Enter to send when focus textarea
  function onFocusEnterSend() {
    this.addEventListener("keypress", enterToSendOnFocus);
  }
  function enterToSendOnFocus(e) {
    if ((e.code == "Enter" || e.code == "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.sendButton.click();
    }
  }
  //Disable enter to send when focus out textarea
  function onFocusOutDisableEnter() {
    this.removeEventListener("keypress", onFocusEnterSend, true);
  }
});
