import React from "react";
import { Button } from "react-bootstrap";
function UserRoomsList({ rooms }) {
  return (
    <table className="table table-sm table-dark w-50">
      <thead>
        <tr>
          <th colSpan={3}> Rooms </th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => {
          return (
            <tr key={index}>
              <td> {room.name}</td>
              <td>
                <Button className="btn btn-primary"> EDIT </Button>
              </td>
              <td>
                <Button className="btn btn-danger"> DELETE </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserRoomsList;
