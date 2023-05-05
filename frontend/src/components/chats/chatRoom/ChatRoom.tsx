import React, { useEffect, useState, KeyboardEvent } from "react";

import { joinRoom, sendMessageSocket, userTypingEmit } from "../socket";

import { IMessageSocket, IRoomOnlineUsers } from "@libs/types/socket";
import ChatMessages from "../chatMessages";
import ChatOnlineUsers from "../chatOnlineUsers";
import { Button, Tab } from "react-bootstrap";

function ChatRoom(props: {
  room: IChatRoomRes;
  auth: IAuth;
  roomOnlineUsers: string[] | undefined;
  roomTypingUsers: string | undefined;
  localMessages: IMessageSocket[];
  dbMessages: IMessagesRes[];
}) {
  const { room, auth, roomOnlineUsers, roomTypingUsers, localMessages, dbMessages } = props;
  const { username, id: userId } = auth;

  const [msgToSend, setMsgToSend] = useState("");

  const [showOnlineUsers, setShowOnlineUsers] = useState<boolean>(false);

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
      date: new Date(),
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
      <div>
        <div className="d-flex flex-fill justify-content-center bg-dark border-bottom mb-2 position-relative">
          <div className="d-flex">
            <span className="text-info">{room.name}</span>
          </div>
          <div className="flex-shrink-1 align-self-center position-absolute top-0 end-0">
            <Button
              className="btn btn-dark btn-outline-secondary rounded-circle w-100 btn-sm py-0 online-users-button"
              onClick={() => setShowOnlineUsers(!showOnlineUsers)}
            >
              &#128516;
            </Button>
          </div>
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex flex-row">
            <div className="chat-scrollable" id={"scrollable-" + room._id}>
              <ChatMessages localMessages={localMessages} dbMessages={dbMessages} />
            </div>
            {showOnlineUsers && roomOnlineUsers ? (
              <div className="chat-scrollable w-50">
                <ChatOnlineUsers onlineUsers={[...roomOnlineUsers.values()]} />
              </div>
            ) : null}
          </div>
          <div>
            {roomTypingUsers ? `${roomTypingUsers} is typing...` : null}
            <textarea
              className="form-control w-100 m-1 bg-dark text-light"
              rows={3}
              onChange={(e) => setMsgToSend(e.target.value)}
              onKeyDown={(e) => {
                textareaOnKey(e);
              }}
            />
            <Button className="w-100 btn-secondary btn-lg p-4" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </Tab.Pane>
  );
}

export default ChatRoom;
