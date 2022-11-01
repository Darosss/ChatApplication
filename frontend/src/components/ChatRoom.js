import React, { useState, useEffect, useReducer } from "react";
import ChatMessage from "./ChatMessage";
import OnlineUsers from "./OnlineUsers";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function ChatRoom(props) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  // console.log(isConnected);

  const [, forceUpdate] = useReducer((x) => x + 1, 0); //update state

  const [msgToSend, setMsgToSend] = useState("");

  const [localMessages, setLocalMessages] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [roomsOnlineUsers, setRoomsOnlineUsers] = useState([]);

  const chatRooms = props.chatRooms;
  const messages = props.messages;
  const auth = props.auth;
  const username = auth.username;
  const userId = auth._id;

  let roomsList = [];
  let roomsContent = [];

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("join channels");
    };
  }, []);

  useEffect(() => {
    socket.on("chat message", (data) => {
      forceUpdate();

      let tempLocalMsgs = localMessages;
      let roomId = data.roomId;

      let messageComp = (
        <ChatMessage
          message={data.message}
          sentTime={data.date}
          sender={data.username}
          key={data.username + data.date}
        />
      );
      if (tempLocalMsgs[roomId]) tempLocalMsgs[roomId].push(messageComp);
      else tempLocalMsgs[roomId] = [messageComp];
      setLocalMessages(tempLocalMsgs);
    });

    return () => {
      socket.off("chat message");
    };
  }, [localMessages]);

  useEffect(() => {
    socket.on("join channels", () => {
      chatRooms.forEach((room) => {
        let data = { username: username, userId: userId, roomId: room._id };

        socket.emit("join channel", data);
      });
    });
  }, [username, userId, chatRooms]);

  useEffect(() => {
    socket.on("room_online_users", (data) => {
      let tempRoomsOnlineUsers = roomsOnlineUsers;
      tempRoomsOnlineUsers[data.roomId] = data.roomUsers;

      setRoomsOnlineUsers(tempRoomsOnlineUsers);
      forceUpdate();
    });

    return () => {
      socket.off("room_online_users");
    };
  }, [roomsOnlineUsers]);

  useEffect(() => {
    socket.on("user_connected", () => {
      socket.emit("user_connected", username);
    });

    socket.on("refresh_online_users", (data) => {
      setOnlineUsers(data);
      forceUpdate();
    });

    return () => {
      socket.off("user_connected");
      socket.off("refresh_online_users");
    };
  }, [onlineUsers, username]);

  const sendMessage = (e) => {
    let data = {
      roomId: e.target.id,
      userId: userId,
      username: username,
      message: msgToSend,
    };

    socket.emit("chat message", data);
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
              <div className="chat-scrollable">
                <Table className="text-light">
                  <tbody>
                    {chatMsgsTable(room._id)}

                    {localMessages[room._id]
                      ? localMessages[room._id].map((msg) => {
                          return msg;
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
            <td className="d-inline-flex w-100">
              <textarea
                className="form-control w-100 m-1 bg-dark text-light"
                id="messageTextArea"
                rows="3"
                onChange={(e) => setMsgToSend(e.target.value)}
              ></textarea>

              <Button
                className="w-25 btn-secondary"
                id={room._id}
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
    let roomSockets = Object.keys(roomUsers);
    return roomSockets.map((socket, index) => {
      return (
        <OnlineUsers
          key={socket}
          socketId={socket}
          username={roomUsers[socket]}
        />
      );
    });
  };
  chatRooms.forEach((room) => {
    roomsList.push(
      <Nav.Item key={room._id} className="w-100">
        <Nav.Link eventKey={room._id}> {room.name} </Nav.Link>
      </Nav.Item>
    );
    roomsContent.push(
      <Tab.Pane key={room._id} eventKey={room._id} className="w-100">
        {roomContent(room)}
      </Tab.Pane>
    );
  });

  return (
    <Tab.Container id="left-tabs-chats">
      <Row className="w-100">
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            {roomsList}
          </Nav>
        </Col>
        <Col sm={7}>
          <Tab.Content>{roomsContent}</Tab.Content>
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
