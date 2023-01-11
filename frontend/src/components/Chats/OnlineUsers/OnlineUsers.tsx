import React from "react";
import "./style.css";

function OnlineUsers(props: { socketId: string; username: string }) {
  return (
    <tr>
      <td id={props.socketId} className="w-25">
        {props.username}
      </td>
    </tr>
  );
}

export default OnlineUsers;
