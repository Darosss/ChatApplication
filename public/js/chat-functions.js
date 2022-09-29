(function () {
  const chatBoxes = document.getElementsByClassName("chat-container");
  const chatWindow = document.querySelector(".chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
  for (let i = 0; i < chatBoxes.length; i++) {
    let sendBtn = chatBoxes[i].querySelector(".btn-primary");
    let textarea = chatBoxes[i].querySelector(".message-window");
    dynamicResizeTextarea(textarea);
    textareaEventListeners(textarea, sendBtn);
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
})();
