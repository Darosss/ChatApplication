import "./style.css";
import { useState, useEffect, useReducer, useRef, KeyboardEvent } from "react";
import ChatMessage from "../ChatMessage";
import OnlineUsers from "../OnlineUsers";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import HamburgerMenu from "../../HamburgerMenu";

import {
  initiateSocketConnection,
  userConnectedEmit,
  disconnectSocket,
  subscribeToChat,
  sendMessageSocket,
  joinRoom,
  refreshOnlineUsers,
  roomOnlineUsers,
  onUserTyping,
  userTypingEmit,
} from "../Socket";

import {
  IMessageSocket,
  IRoomOnlineUsers,
} from "../../../../../libs/types/socket"; //Types from socket - change later to globals? Dunno

type Timer = ReturnType<typeof setTimeout>;

function ChatRoom(props: {
  auth: IAuth;
  chatRooms: IChatRoomRes[];
  messages: Map<string, IMessagesRes[]>;
}) {
  const { auth, chatRooms, messages } = props;
  const username = auth.username;
  const userId = auth.id;
  const [, forceUpdate] = useReducer((x) => x + 1, 0); //update state

  const [msgToSend, setMsgToSend] = useState<string>("");
  const [roomIdToSend, setRoomIdToSend] = useState<string>("");

  const [localMessages, setLocalMessages] = useState(
    new Map<string, IMessageSocket[]>()
  );

  const [roomsList, setRoomsList] = useState<IChatRoomRes[]>();

  const [onlineUsers, setOnlineUsers] = useState<[string, string][]>([]);
  const [roomsOnlineUsers, setRoomsOnlineUsers] = useState<
    Map<string, string[]>
  >(new Map<string, string[]>());
  const [roomsTypingUsers, setRoomsTypingUsers] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  const chatList = useRef<HTMLDivElement>(null);
  const usersOnlineTable = useRef<HTMLDivElement>(null);

  const typingTimeoutMs = 5000;

  useEffect(() => {
    setRoomsList(chatRooms);
  }, [chatRooms]);

  useEffect(() => {
    initiateSocketConnection();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    let typingTimeout: Timer;
    const updateLocalMessages = (msgData: IMessageSocket) => {
      let roomId = msgData.roomId;
      setLocalMessages((prevState) => {
        if (!prevState.has(roomId)) {
          prevState.set(roomId, [msgData]);
        } else {
          prevState.get(roomId)?.push(msgData);
        }

        return prevState;
      });
    };

    const updateRoomsOnlineUsers = (roomId: string, roomUsers: string[]) => {
      setRoomsOnlineUsers((prevState) => {
        prevState.set(roomId, roomUsers);
        return prevState;
      });
    };

    refreshOnlineUsers((err, data) => {
      setOnlineUsers(data);
    });

    roomOnlineUsers((err, data) => {
      if (err) console.log(err, "err");

      updateRoomsOnlineUsers(data.roomId, data.roomUsers);
      forceUpdate();
    });

    subscribeToChat((err, data) => {
      if (err) console.log(err);

      updateLocalMessages(data);
      forceUpdate();
      setTimeout(() => {
        scrollToBottom("scrollable-" + data.roomId);
      }, 50);
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
  }, []);

  useEffect(() => {
    roomsList?.forEach((room) => {
      joinRoom({
        username: props.auth.username,
        roomId: room._id,
      } as IRoomOnlineUsers);
    });
  }, [roomsList, props]);

  useEffect(() => {
    userConnectedEmit(username);
  }, [username]);

  const sendMessage = () => {
    let msg = {
      roomId: roomIdToSend,
      userId: userId,
      message: msgToSend,
      sender: username,
    };
    sendMessageSocket(msg);
  };

  const textareaOnKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") sendMessageOnKey(e);
    else userTypingTimeout();
  };

  const sendMessageOnKey = (e: KeyboardEvent) => {
    e.preventDefault();
    sendMessage();
    (e.target as HTMLInputElement).value = "";
    setMsgToSend("");
  };

  const userTypingTimeout = () => {
    userTypingEmit(username, roomIdToSend);
  };

  const scrollToBottom = (sectionId: string) => {
    const chatMessages = document.querySelector(
      "#" + sectionId
    ) as HTMLInputElement;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const roomContent = (room: IChatRoomRes) => {
    return (
      <Table striped bordered variant="dark">
        <thead>
          <tr>
            <th colSpan={3}>{room.name} </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <div className="chat-scrollable" id={"scrollable-" + room._id}>
                <Table className="text-light">
                  <tbody>
                    {chatMsgsTable(room._id)}

                    {localMessages
                      ? localMessages.get(room._id)?.map((msg) => {
                          return (
                            <ChatMessage
                              message={msg.message}
                              sentTime={msg.date as Date}
                              sender={msg.sender as string}
                              key={
                                ((msg.sender as string) + msg.date) as string
                              }
                            />
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              </div>
            </td>
            <td colSpan={2} className="w-25">
              <div className="chat-scrollable">
                <Table className="text-light">
                  <thead>
                    <tr>
                      <th>Online users:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomsOnlineUsers?.has(room._id)
                      ? chatOnlineUsers(room._id)
                      : null}
                  </tbody>
                </Table>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {roomsTypingUsers?.get(room._id)
                ? roomsTypingUsers.get(room._id) + " is typing"
                : null}
            </td>
          </tr>
          <tr>
            <td className="d-inline-flex w-100">
              <textarea
                className="form-control w-100 m-1 bg-dark text-light"
                rows={3}
                onChange={(e) => setMsgToSend(e.target.value)}
                onFocus={() => setRoomIdToSend(room._id)}
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
    );
  };

  const chatMsgsTable = (roomId: string) => {
    return messages.get(roomId)?.map((msg, indxMsg) => {
      return (
        <ChatMessage
          message={msg.message as string}
          sentTime={msg.sentTime}
          sender={msg.sender.username as string}
          key={indxMsg}
        />
      );
    });
  };

  const chatOnlineUsers = (roomId: string) => {
    let roomUsers = roomsOnlineUsers?.get(roomId);

    return roomUsers?.map((user) => {
      return (
        <OnlineUsers key={user[0]} socketId={user[0]} username={user[1]} />
      );
    });
  };

  return (
    <Tab.Container id="left-tabs-chats">
      <div className="chat-section chat-section-right">
        Online users:
        <HamburgerMenu menu={usersOnlineTable} />
      </div>
      <div className="chat-section">
        Room list:
        <HamburgerMenu menu={chatList} />
      </div>
      <Row className="w-100 mt-4">
        <Col md={2}>
          <div className="chat-section-wide">Room list</div>
          <Nav variant="pills nav-chats chats-list" ref={chatList}>
            {roomsList?.map((room) => {
              return (
                <Nav.Item
                  key={room._id}
                  className="border border-primary rounded chats-item"
                >
                  <Nav.Link eventKey={room._id}> {room.name} </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Col>
        <Col md={7}>
          <Tab.Content>
            {roomsList?.map((room) => {
              return (
                <Tab.Pane key={room._id} eventKey={room._id} className="w-100">
                  {roomContent(room)}
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Col>
        <Col xs={{ order: "first" }} md={{ order: 3 }}>
          <div className="chat-online-users" ref={usersOnlineTable}>
            <div className="chat-section-wide">Room list</div>
            <Table className="text-light">
              <tbody>
                {onlineUsers.length > 0
                  ? onlineUsers.map((user) => {
                      return (
                        <tr key={user[0]}>
                          <td>{user[1]}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ChatRoom;
