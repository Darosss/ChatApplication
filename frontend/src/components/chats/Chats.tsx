import React, { useState, useRef, useEffect, useReducer, useContext } from "react";
import ChatRoom from "./chatRoom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import {
  initiateSocketConnection,
  disconnectSocket,
  userConnectedEmit,
  refreshOnlineUsers,
  roomOnlineUsers,
  onUserTyping,
  subscribeToChat,
} from "./socket";
import { MessageSocket } from "./socket";
import { scrollToBottom } from "@utils/scrollToBottom.util";
import ChatOnlineUsers from "./chatOnlineUsers";
import InfoSidebar from "@components/infoSidebar";
import { AuthContext } from "@contexts/authContext";
import { useGetLoggedUserRooms, useGetRoomMessages } from "@hooks/roomsApi";

type Timer = ReturnType<typeof setTimeout>;

function Chats() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); //update state

  const { auth } = useContext(AuthContext);

  const { username } = auth;

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [roomsOnlineUsers, setRoomsOnlineUsers] = useState(new Map<string, Map<string, string>>());
  const [roomsTypingUsers, setRoomsTypingUsers] = useState<Map<string, string>>(new Map<string, string>());
  const [localMessages, setLocalMessages] = useState<Map<string, MessageSocket[]>>(new Map<string, MessageSocket[]>());

  const [dbMessages, setDBMessages] = useState<IMessagesRes[]>([]);
  const [viewedRoomId, setViewedRoomId] = useState<string>("");
  const [chatRooms, setChatRooms] = useState<IChatRoomRes[]>([]);

  const chatList = useRef<HTMLDivElement>(null);
  const usersOnlineTable = useRef<HTMLDivElement>(null);

  const typingTimeoutMs = 5000;

  const { roomsResponse } = useGetLoggedUserRooms();

  const { messagesResponse, getRoomMessages } = useGetRoomMessages(viewedRoomId);

  useEffect(() => {
    if (roomsResponse) setChatRooms(roomsResponse.data.rooms);
  }, [roomsResponse]);

  useEffect(() => {
    let typingTimeout: Timer;

    initiateSocketConnection();
    userConnectedEmit(username);

    refreshOnlineUsers((err, data) => {
      setOnlineUsers(data);
    });

    roomOnlineUsers((err, data) => {
      if (err) console.log(err, "err");

      setRoomsOnlineUsers((prevState) => {
        prevState.set(data.roomId, new Map(data.roomUsers));
        return prevState;
      });
      forceUpdate();
    });

    onUserTyping((err, data) => {
      setRoomsTypingUsers((prevState) => {
        prevState.set(data.roomId, data.username);
        return prevState;
      });
      clearTimeout(typingTimeout);

      typingTimeout = setTimeout(() => {
        setRoomsTypingUsers((prevState) => {
          prevState.delete(data.roomId);
          return prevState;
        });
        forceUpdate();
      }, typingTimeoutMs);
      forceUpdate();
    });

    subscribeToChat((err, data) => {
      if (err) console.log(err);

      const roomId = data.roomId;
      setLocalMessages((prevState) => {
        if (!prevState.has(roomId)) {
          prevState.set(roomId, [data]);
        } else {
          prevState.get(roomId)?.push(data);
        }

        return prevState;
      });

      forceUpdate();
      setTimeout(() => {
        scrollToBottom(`scrollable-${data.roomId}`);
      }, 50);
    });

    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (viewedRoomId) getRoomMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewedRoomId]);

  useEffect(() => {
    setDBMessages(messagesResponse?.data.chatRoom.messages || []);
  }, [messagesResponse]);

  const handleOnClickChangeRoom = (room: IChatRoomRes) => {
    setViewedRoomId(room._id);
  };

  return (
    <Tab.Container id="left-tabs-chats">
      <Row className="w-100 mt-4">
        <Col md={2}>
          <InfoSidebar title="Available rooms" placement="bottom" btnText="Rooms" backdrop={true}>
            <div className="d-flex flex-column w-100">
              <div className="d-flex chat-section-wide bg-dark justify-content-center">Room list: </div>
              <Nav variant="pills nav-chats chats-list" ref={chatList}>
                {chatRooms?.map((room) => {
                  return (
                    <Nav.Item key={room._id} className="border border-primary bg-dark rounded mt-1 chats-item">
                      <Nav.Link
                        eventKey={room._id}
                        onClick={() => {
                          handleOnClickChangeRoom(room);
                        }}
                      >
                        {room.name}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </div>
          </InfoSidebar>
        </Col>
        <Col md={7}>
          <Tab.Content>
            {chatRooms?.map((room) => {
              const roomIdUsers = roomsOnlineUsers.get(room._id)?.values() || [""];
              return (
                <ChatRoom
                  key={room._id}
                  room={room}
                  auth={auth}
                  localMessages={localMessages.get(room._id)!}
                  dbMessages={dbMessages}
                  roomOnlineUsers={[...roomIdUsers]}
                  roomTypingUsers={roomsTypingUsers.get(room._id)}
                />
              );
            })}
          </Tab.Content>
        </Col>
        <Col xs={{ order: "first" }} md={{ order: "3" }}>
          <div className="chat-online-users" ref={usersOnlineTable}>
            <InfoSidebar title="Online users" placement="end" btnText="Users">
              <ChatOnlineUsers onlineUsers={onlineUsers} />
            </InfoSidebar>
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
}
export default Chats;
