import React from "react";

function OnlineUsers(props) {
  return (
    <tr>
      <td id={props.socketId} className="w-25">
        {props.username}
      </td>
    </tr>
  );
}

export default OnlineUsers;
