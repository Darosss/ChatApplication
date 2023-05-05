import React from "react";
import { Table } from "react-bootstrap";
import { IMessageSocket } from "@libs/types/socket";
import ChatMessage from "../chatMessage";

function ChatMessages(props: { localMessages: IMessageSocket[]; dbMessages: IMessagesRes[] }) {
  const { localMessages, dbMessages } = props;

  const mapMessagesDB = () => {
    return dbMessages.map((message, index) => {
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
