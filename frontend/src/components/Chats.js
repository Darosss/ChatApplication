import React, { useState, useEffect } from "react";

// import { Button } from "react-bootstrap";
import axios from "axios";
import ChatRoom from "./ChatRoom";
// import SocketIO from "./SocketIO";

function Chats() {
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/chats",
    };
    axios(axiosConfig).then((res) => {
      console.log(res.data);

      setMessages(res.data.rooms);
      setChatRooms(res.data.userChatRooms);
    });
  }, []);

  const chatRoomsButtons = () => {
    return (
      <div class="btn-group btn-group-justified">
        <button
          className="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target=".multi-collapse"
          aria-expanded="false"
        >
          Toggle all chats
        </button>
        {chatRooms.map((room, index) => {
          return (
            <button
              className="btn btn-primary"
              data-toggle="collapse"
              href={"#" + room.name}
              aria-expanded="false"
              aria-controls={room.name}
            >
              {room.name}
            </button>
          );
        })}
      </div>
    );
  };

  const chatRoomsTable = () => {
    return (
      <div className="row">
        {chatRooms.map((room, index) => {
          return (
            <div>
              <ChatRoom room={room} messages={messages[room._id]} key={index} />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2> Chat rooms </h2>
        {/* <SocketIO></SocketIO> */}
        {chatRoomsButtons()}
        {chatRoomsTable()}
      </header>
    </div>
  );
}
export default Chats;
