import React, { useState, useEffect } from "react";
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

  return (
    <div className="container-fluid bg-dark App-header">
      <ChatRoom chatRooms={chatRooms} messages={messages} />
    </div>
  );
}
export default Chats;
