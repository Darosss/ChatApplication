import React from "react";

function ChatMessages({ message }) {
  return (
    <tr>
      <td>{message.sender.username}</td>
      <td>{message.message}</td>
      <td>{message.whereSent.name}</td>
      <td>
        <button className="btn btn-primary">Edit</button>
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
}

export default ChatMessages;
