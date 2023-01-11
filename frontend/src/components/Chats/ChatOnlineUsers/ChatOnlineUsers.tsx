import React from "react";
import { Table } from "react-bootstrap";
import "./style.css";

function ChatOnlineUsers(props: { onlineUsers: string[] | undefined }) {
  const { onlineUsers } = props;

  return (
    <Table className="text-light">
      <thead>
        <tr>
          <th>Online users:</th>
        </tr>
      </thead>
      <tbody>
        {onlineUsers?.map((user) => {
          return (
            <tr key={user[0]}>
              <td> {user[1]} </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ChatOnlineUsers;
