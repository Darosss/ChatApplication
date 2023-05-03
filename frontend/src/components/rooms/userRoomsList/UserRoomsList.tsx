import React from "react";
import "./style.css";
import EditCreateRoomModal from "../editCreateRoomModal";
import DeleteRoomModal from "../deleteRoomModal";

function UserRoomsList(props: { rooms: IChatRoomRes[]; ranges: IRangeRes[]; users: IUserRes[] }) {
  const { rooms, ranges, users } = props;

  return (
    <div>
      <table className="table table-sm table-dark user-rooms-list">
        <thead>
          <tr>
            <th> Rooms </th>
            <th colSpan={2}>
              <EditCreateRoomModal sectionName="Create" ranges={ranges} users={users} />
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => {
            return (
              <tr key={index}>
                <td> {room.name}</td>
                <td>
                  <EditCreateRoomModal sectionName="Edit" room={room} ranges={ranges} users={users} />
                </td>
                <td>
                  <DeleteRoomModal roomId={room._id} />
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
