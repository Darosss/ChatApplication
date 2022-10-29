import React from "react";

function ChatMessages({ message }) {
  return (
    <tr>
      <td className="w-25">
        <span
          className="text-muted message-time fs-6"
          style={{ fontSize: "2vmin" }}
        >
          {message.sentTime.replace("T", " ").split(".")[0]}:
        </span>
        <span> {message.sender.username}</span>
      </td>
      <td className="w-75 text-wrap text-break">{message.message}</td>
    </tr>
  );
}

export default ChatMessages;
