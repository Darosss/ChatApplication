(function () {
  const chatBoxes = document.getElementsByClassName("chat-container");
  console.log(chatBoxes);
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
    textarea.addEventListener("input", textareaOnInput, false);
    textarea.addEventListener("focus", textareaOnFocus, false);
    textarea.sendButton = btn;
    textarea.addEventListener("focusout", textareaOnFocusOut, false);

    function textareaOnInput() {
      this.style.height = 0;
      this.style.height = this.scrollHeight + "px";
    }

    function textareaOnFocus() {
      this.addEventListener("keypress", handleKeypress);
    }
    function textareaOnFocusOut() {
      this.removeEventListener("keypress", textareaOnFocus, true);
    }
    function handleKeypress(e) {
      if ((e.code == "Enter" || e.code == "NumpadEnter") && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.sendButton.click();
      }
    }
  }
})();
