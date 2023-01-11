import "./style.css";
import React, { useEffect, useState, KeyboardEvent } from "react";

import { joinRoom, sendMessageSocket, userTypingEmit } from "../Socket";

import { IMessageSocket, IRoomOnlineUsers } from "../../../../../libs/types/socket"; //Types from socket - change later to globals? Dunno
import ChatMessages from "../ChatMessages";
import ChatOnlineUsers from "../ChatOnlineUsers";
import { Button, Tab, Table } from "react-bootstrap";

function ChatRoom(props: {
  room: IChatRoomRes;
  auth: IAuth;
  roomOnlineUsers: string[] | undefined;
  roomTypingUsers: string | undefined;
  localMessages: IMessageSocket[];
}) {
  const { room, auth, roomOnlineUsers, roomTypingUsers, localMessages } = props;
  const { username, id: userId } = auth;

  const [msgToSend, setMsgToSend] = useState("");

  useEffect(() => {
    joinRoom({
      username: username,
      roomId: room._id,
    } as IRoomOnlineUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  const sendMessage = () => {
    const msg = {
      roomId: room._id,
      userId: userId,
      message: msgToSend,
      sender: username,
    };
    sendMessageSocket(msg);
  };

  const sendMessageOnKey = (e: KeyboardEvent) => {
    e.preventDefault();
    sendMessage();
    (e.target as HTMLInputElement).value = "";
    setMsgToSend("");
  };

  const textareaOnKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") sendMessageOnKey(e);
    else userTypingEmit(username, room._id);
  };

  return (
    <Tab.Pane key={room._id} eventKey={room._id} className="w-100">
      <Table striped bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>{room.name} </th>
          </tr>
        </thead>
        <tbody>
          {/* component ChatMessage in loop of messages of room id + local messages */}
          <tr>
            <td colSpan={2}>
              <div className="chat-scrollable" id={"scrollable-" + room._id}>
                <ChatMessages roomId={room._id} localMessages={localMessages} />
              </div>
            </td>
            <td colSpan={2} className="w-25">
              <div className="chat-scrollable">
                <ChatOnlineUsers onlineUsers={roomOnlineUsers} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{roomTypingUsers ? `${roomTypingUsers} is typing` : null}</td>
          </tr>
          <tr>
            <td className="d-inline-flex w-100">
              <textarea
                className="form-control w-100 m-1 bg-dark text-light"
                rows={3}
                onChange={(e) => setMsgToSend(e.target.value)}
                onKeyDown={(e) => {
                  textareaOnKey(e);
                }}
              ></textarea>
            </td>
            <td colSpan={2} className="row-btn-send">
              <Button
                className="w-100 btn-secondary btn-lg p-4"
                // room={room._id }
                onClick={sendMessage}
              >
                Send
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Tab.Pane>
  );
}

export default ChatRoom;
