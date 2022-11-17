import React from "react";
import EditCreateRoomModal from "./EditCreateRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";

function UserRoomsList(props) {
  return (
    <div className="container d-flex justify-content-center">
      <table className="table table-sm table-dark w-100">
        <thead>
          <tr>
            <th> Rooms </th>
            <th colSpan={2}>
              <EditCreateRoomModal sectionName="Create" />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.rooms.map((room, index) => {
            return (
              <tr key={index}>
                <td> {room.name}</td>
                <td>
                  <EditCreateRoomModal
                    sectionName="Edit"
                    roomId={room._id}
                    isEdit="true"
                  />
                </td>
                <td>
                  <DeleteRoomModal roomName={room.name} roomId={room._id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserRoomsList;
