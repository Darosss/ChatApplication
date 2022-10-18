import React from "react";
import ChatMessage from "./ChatMessage";

function ChatRoom(props) {
  const chatMsgsTable = () => {
    return props.messages.map((msg, indxMsg) => {
      return <ChatMessage message={msg} key={indxMsg} />;
    });
  };

  return (
    <div className="col">
      <div className="collapse multi-collapse" id={props.room.name}>
        <div className="card card-body bg-dark ">
          <h1> {props.room.name} </h1>
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th>User</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>{chatMsgsTable()}</tbody>
          </table>
          <div className="btn-group btn-group-justified">
            <button className="btn btn-primary w-50"> SEND</button>
            <button className="btn btn-primary w-50"> JOIN</button>
            <button className="btn btn-primary w-50"> LEAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
