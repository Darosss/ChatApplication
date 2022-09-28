(function () {
  $(document).ready(function () {
    var socket = io({ autoConnect: true });
    let tempUsers = ["Daro", "Kupa", "jajka321", "ktos nowy", "ziemniak"],
      ranUser =
        tempUsers[Math.floor(Math.random() * (tempUsers.length - 1))] +
        Math.floor(Math.random() * 203);
    let typingTime = 5000;
    let chatContainers = $(".chat-container");
    //Loop through all containers to set adequate sockets to chat rooms
    chatContainers.each(function () {
      let sendButton = this.querySelector(".btn-primary"),
        chatForm = this.querySelector(".chat-form"),
        chatTxtarea = this.querySelector("textarea"),
        joinButton = $(this).find('button[id*="join"]'),
        leaveButton = $(this).find('button[id*="leave"]'),
        roomID = "#" + $(this).attr("id"),
        usersList = this.querySelector(".user-list-window"),
        showUsersButton = this.querySelector(".btn-chat-users"),
        typingInChat = false,
        timeoutTyping = undefined;
      sendButton.innerHTML = "Send as " + ranUser; //debug
      // let kappa = this.querySelector(".testKappa");
      // console.log(kappa);
      // kappa.onclick = function () {
      //   socket.emit("testch", ranUser);
      // };

      $(joinButton).on("click", function () {
        sendButton.style.display = "inline-block";
        joinLeaveRoom(this, leaveButton, "join room", ranUser, roomID);
      });
      $(leaveButton).on("click", function () {
        joinLeaveRoom(this, joinButton, "leave room", ranUser, roomID);
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
          typingTimeout(ranUser, roomID, (typingInChat = true));
          clearTimeout(timeoutTyping);
          timeoutTyping = setTimeout(
            typingTimeout,
            typingTime,
            ranUser,
            roomID,
            (typingInChat = false)
          );
        } else {
          typingInChat = false;
          typingTimeout(ranUser, roomID, typingInChat);
          clearTimeout(timeoutTyping);
        }
      });
    });
    //END For each chat room
    socket.onAny((event, ...args) => {
      console.log("onAny", event, args);
    });
    //DEBUG ON ALL EVENTS
    socket.on("chat message", function (data) {
      addMessageToChatbox(
        data.user,
        data.roomTarget + " .chat-window",
        data.msg,
        data.date.split("T")[1].split(".")[0]
      );
    });
    socket.on("connect", function () {
      console.log("CONNECT?");
    });
    socket.on("disconnect", () => {
      console.log("DISC");
    });
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
    function typingTimeout(user, room, typing) {
      socket.emit("user typing", {
        username: user,
        roomName: room,
        isTyping: typing,
      });
    }
    function joinLeaveRoom(btnPressed, btnToEnable, evnName, user, roomName) {
      socket.emit(evnName, { username: user, roomName: roomName });
      btnPressed.disabled = true;
      $(btnToEnable).removeAttr("disabled");
    }
    function onSubmitMessage(event) {
      event.preventDefault();
      let chatTextarea = event.data.textarea,
        roomName = event.data.room;
      if (chatTextarea.value) {
        let msgDate = new Date();
        socket.emit("chat message", {
          user: ranUser,
          roomTarget: roomName,
          msg: chatTextarea.value,
          date: msgDate,
        });
        msgDate = msgDate.toISOString().split("T")[1].split(".")[0];
        addMessageToChatbox(
          ranUser,
          roomName + " .chat-window",
          chatTextarea.value,
          msgDate
        );
        chatTextarea.value = "";
      }
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
  });
})();
