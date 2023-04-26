import React from "react";
import { Table } from "react-bootstrap";
import { IMessageSocket } from "@libs/types/socket";
import useAcciosHook from "@hooks/useAcciosHook";
import ChatMessage from "../ChatMessage";
import "./style.css";

function ChatMessages(props: { roomId: string; localMessages: IMessageSocket[] }) {
  const { roomId, localMessages } = props;

  const { response, loading } = useAcciosHook({
    url: `/rooms/${roomId}/messages`,
    method: "get",
    withCredentials: true,
  });
  const roomMessagesDB = response?.data.chatRoom.messages as IMessagesRes[];

  if (loading) return null;

  const mapMessagesDB = () => {
    return roomMessagesDB.map((message) => {
      return (
        <ChatMessage
          key={`${message.sender}-${message.sentTime as unknown as string}`}
          message={message.message}
          sentTime={message.sentTime}
          sender={message.sender.username}
        />
      );
    });
  };

  const mapMessagesLocal = () => {
    return localMessages?.map((message) => {
      return (
        <ChatMessage
          key={`${message.sender}-${message.date as unknown as string}`}
          message={message.message}
          sentTime={message.date!}
          sender={message.sender!}
        />
      );
    });
  };

  return (
    <Table className="text-light">
      <tbody>
        {mapMessagesDB()}
        {mapMessagesLocal()}
      </tbody>
    </Table>
  );
}

export default ChatMessages;
