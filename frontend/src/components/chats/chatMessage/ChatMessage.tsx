import React from "react";
import "./style.css";

function ChatMessage(props: { message: string; sentTime: Date; sender: string }) {
  return (
    <tr>
      <td className="col-time-sender">
        <span className="chat-message-time">{props.sentTime.toString().replace("T", " ").split(".")[0]}</span>
        <span className="chat-message-sender"> {props.sender}</span>
      </td>
      <td className="w-75 text-wrap text-break bg-dark chat-message-msg">{props.message}</td>
    </tr>
  );
}

export default ChatMessage;
