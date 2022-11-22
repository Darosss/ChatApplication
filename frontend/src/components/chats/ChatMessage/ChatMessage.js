import "./style.css";
import React from "react";

function ChatMessage(props) {
  return (
    <tr>
      <td className="w-25">
        <span className="chat-message-time">
          {props.sentTime.replace("T", " ").split(".")[0]}:
        </span>
        <span className="chat-message-sender"> {props.sender}</span>
      </td>
      <td className="w-75 text-wrap text-break bg-dark chat-message-msg">
        {props.message}
      </td>
    </tr>
  );
}

export default ChatMessage;
