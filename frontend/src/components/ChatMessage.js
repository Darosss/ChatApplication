import React from "react";

function ChatMessage(props) {
  return (
    <tr>
      <td className="w-25">
        <span
          className="text-muted message-time fs-6"
          style={{ fontSize: "2vmin" }}
        >
          {props.sentTime.replace("T", " ").split(".")[0]}:
        </span>
        <span> {props.sender}</span>
      </td>
      <td className="w-75 text-wrap text-break">{props.message}</td>
    </tr>
  );
}

export default ChatMessage;
