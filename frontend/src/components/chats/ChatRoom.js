import React, { useState, useEffect, useReducer } from "react";
import ChatMessage from "./ChatMessage";
import OnlineUsers from "./OnlineUsers";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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
} from "./Socket";

function ChatRoom(props) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0); //update state

  const [msgToSend, setMsgToSend] = useState("");
  const [roomIdToSend, setRoomIdToSend] = useState("");

  const [localMessages, setLocalMessages] = useState([]);

  const [roomsList, setRoomsList] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [roomsOnlineUsers, setRoomsOnlineUsers] = useState([]);
  const [roomsTypingUsers, setRoomsTypingUsers] = useState([]);

  const messages = props.messages;
  const username = props.auth.username;
  const userId = props.auth._id;

  const typingTimeoutMs = 5000;

  useEffect(() => {
    setRoomsList(props.chatRooms);
  }, [props]);

  useEffect(() => {
    let typingTimeout = undefined;
    const updateLocalMessages = (msgData) => {
      let roomId = msgData.roomId;
      setLocalMessages((prevState) => {
        if (prevState[roomId]) prevState[roomId].push(msgData);
        else prevState[roomId] = [msgData];
        return prevState;
      });
    };

    const updateRoomsOnlineUsers = (roomId, roomUsers) => {
      setRoomsOnlineUsers((prevState) => {
        prevState[roomId] = roomUsers;
        return prevState;
      });
    };

    initiateSocketConnection();
    userConnectedEmit(username);

    roomsList.forEach((room) => {
      joinRoom({ username: username, roomId: room._id });
    });

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
        prevState[data.roomId] = data.username;
        return prevState;
      });

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setRoomsTypingUsers((prevState) => {
          prevState[data.roomId] = undefined;
          return prevState;
        });
        forceUpdate();
      }, typingTimeoutMs);
      forceUpdate();
    });

    return () => {
      disconnectSocket();
    };
  }, [roomsList, username]);

  const sendMessage = () => {
    let msg = {
      roomId: roomIdToSend,
      userId: userId,
      username: username,
      message: msgToSend,
    };
    sendMessageSocket(msg);
  };

  const textareaOnKey = (e) => {
    if (e.key === "Enter") sendMessageOnKey(e);
    else userTypingTimeout(e);
  };

  const sendMessageOnKey = (e) => {
    e.preventDefault();
    sendMessage();
    e.target.value = "";
    setMsgToSend("");
  };

  const userTypingTimeout = (e) => {
    userTypingEmit(username, roomIdToSend);
  };

  const scrollToBottom = (sectionId) => {
    const chatMessages = document.querySelector("#" + sectionId);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const roomContent = (room) => {
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

                    {localMessages[room._id]
                      ? localMessages[room._id].map((msg) => {
                          return (
                            <ChatMessage
                              message={msg.message}
                              sentTime={msg.date}
                              sender={msg.username}
                              key={msg.username + msg.date}
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
                    {roomsOnlineUsers[room._id]
                      ? chatOnlineUsers(room._id)
                      : null}
                  </tbody>
                </Table>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {roomsTypingUsers[room._id]
                ? roomsTypingUsers[room._id] + " is typing"
                : null}
            </td>
          </tr>
          <tr>
            <td className="d-inline-flex w-100">
              <textarea
                className="form-control w-100 m-1 bg-dark text-light"
                rows="3"
                onChange={(e) => setMsgToSend(e.target.value)}
                onFocus={(e) => setRoomIdToSend(room._id)}
                onBlur={(e) => setRoomIdToSend("")}
                onKeyDown={(e) => {
                  textareaOnKey(e);
                }}
              ></textarea>

              <Button
                className="w-25 btn-secondary"
                room={room._id}
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

  const chatMsgsTable = (roomId) => {
    return messages[roomId].map((msg, indxMsg) => {
      return (
        <ChatMessage
          message={msg.message}
          sentTime={msg.sentTime}
          sender={msg.sender.username}
          key={indxMsg}
        />
      );
    });
  };

  const chatOnlineUsers = (roomId) => {
    let roomUsers = roomsOnlineUsers[roomId];

    return roomUsers.map((user, index) => {
      return (
        <OnlineUsers key={user[0]} socketId={user[0]} username={user[1]} />
      );
    });
  };

  return (
    <Tab.Container id="left-tabs-chats">
      <Row className="w-100">
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            {roomsList.map((room) => {
              return (
                <Nav.Item key={room._id} className="w-100">
                  <Nav.Link eventKey={room._id}> {room.name} </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Col>
        <Col sm={7}>
          <Tab.Content>
            {roomsList.map((room) => {
              return (
                <Tab.Pane key={room._id} eventKey={room._id} className="w-100">
                  {roomContent(room)}
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Col>
        <Col sm={3}>
          <Table className="text-light">
            <thead>
              <tr>
                <th>Online users:</th>
              </tr>
            </thead>
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
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ChatRoom;