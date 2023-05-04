import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { IMessageSocket } from "@libs/types/socket";
import ChatMessage from "../chatMessage";
import { useGetRoomMessages } from "@hooks/roomsApi";

function ChatMessages(props: { roomId: string; localMessages: IMessageSocket[] }) {
  const { roomId, localMessages } = props;
  const [roomMessages, setRoomMessages] = useState<IMessagesRes[]>([]);

  const { messagesResponse, messagesLoading } = useGetRoomMessages(roomId);
  useEffect(() => {
    if (messagesResponse) setRoomMessages(messagesResponse.data.chatRoom.messages);
  }, [messagesResponse]);

  if (messagesLoading) return null;

  const mapMessagesDB = () => {
    return roomMessages.map((message, index) => {
      return (
        <ChatMessage
          key={index}
          message={message.message}
          sentTime={message.sentTime}
          sender={message.sender.username}
        />
      );
    });
  };

  const mapMessagesLocal = () => {
    return localMessages?.map((message, index) => {
      return <ChatMessage key={index} message={message.message} sentTime={message.date!} sender={message.sender!} />;
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
