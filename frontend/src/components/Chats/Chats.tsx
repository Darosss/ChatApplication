import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatRoom from "./ChatRoom";

function Chats(props: { auth: IAuth }) {
  const [chatRooms, setChatRooms] = useState<IChatRoomRes[]>([]);
  const [messages, setMessages] = useState<Map<string, IMessagesRes[]>>(new Map<string, IMessagesRes[]>());

  const { auth } = props;

  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/chats`,
    };
    axios(axiosConfig).then((res) => {
      const data = res.data;
      const userChatRooms = data.userChatRooms;
      const roomMessages = data.rooms;

      setChatRooms(userChatRooms);
      roomMessages.forEach((messages: any) => {
        setMessages((prevState) => {
          prevState.set(messages[0], messages[1]);
          return prevState;
        });
      });
    });
  }, []);

  return (
    <>
      <ChatRoom auth={auth} chatRooms={chatRooms} messages={messages} />
    </>
  );
}
export default Chats;
