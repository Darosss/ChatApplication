import React from "react";
import ChatMessage from "./ChatMessage";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";

function ChatRoom(props) {
  const chatRooms = props.chatRooms;
  const messages = props.messages;

  let roomsList = [];
  let roomsContent = [];

  const roomContent = (room) => {
    return (
      <Table striped bordered hover variant="dark">
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
    console.log("room", room.name);
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
