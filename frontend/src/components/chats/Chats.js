import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatRoom from "./ChatRoom";

function Chats(props) {
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const auth = props.auth;

  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/chats`,
    };
    axios(axiosConfig).then((res) => {
      setMessages(res.data.rooms);
      setChatRooms(res.data.userChatRooms);
    });
  }, []);

  return (
    <div className="container-fluid bg-dark App-header">
      <ChatRoom auth={auth} chatRooms={chatRooms} messages={messages} />
    </div>
  );
}
export default Chats;
