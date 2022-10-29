import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
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

  const [msgToSend, setMsgToSend] = useState("");
  // const [lastPong, setLastPong] = useState(null);

  const chatRooms = props.chatRooms;
  const messages = props.messages;
  const auth = props.auth;
  const username = auth.username;
  const userId = auth._id;

  let roomsList = [];
  let roomsContent = [];

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect");

      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnect");
      setIsConnected(false);
    });

    // socket.on("pong", () => {
    //   setLastPong(new Date().toISOString());
    // });

    socket.on("chat message", (data) => {
      console.log("new message", data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
      socket.off("join channels");
      socket.off("pong");
    };
  }, []);

  useEffect(() => {
    socket.on("join channels", () => {
      chatRooms.forEach((room) => {
        let data = { username: username, userId: userId, roomId: room._id };

        socket.emit("join channel", data);
      });
    });
  }, [username, userId, chatRooms]);

  // const sendPing = () => {
  //   console.log("lol", socket);
  //   socket.emit("ping");
  // };

  const sendMessage = (e) => {
    let data = {
      roomId: e.target.id,
      userId: userId,
      username: username,
      msg: msgToSend,
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
                  <tbody>{chatMsgsTable(room._id)}</tbody>
                </Table>
              </div>
            </td>
            <td colSpan={2} className="w-25">
              <div className="chat-scrollable">Online users</div>
            </td>
          </tr>
          <tr>
            <td>
              <Button
                className="w-75 btn-secondary"
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
    return props.messages[roomId].map((msg, indxMsg) => {
      return <ChatMessage message={msg} key={indxMsg} />;
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
    <Tab.Container id="left-tabs-chats" className="d-inline-flex">
      <Row className="w-100">
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {roomsList}
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>{roomsContent}</Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ChatRoom;
