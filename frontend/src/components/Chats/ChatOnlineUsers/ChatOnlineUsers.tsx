import React from "react";
import "./style.css";

function ChatOnlineUsers(props: { onlineUsers: string[] }) {
  const { onlineUsers } = props;

  return (
    <div>
      <div className="d-flex justify-content-center bg-dark">Online users:</div>
      <div className="d-flex flex-column">
        <div>
          {onlineUsers.map((user, index) => {
            return (
              <div key={index} className="border-bottom p-2">
                {user}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChatOnlineUsers;
