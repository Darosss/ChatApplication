import React, { useState } from "react";
import axios from "axios";
import EditCreateRoomModal from "./EditCreateRoomModal";

function UserRoomsList(props) {
  const [editedRoom, setEditedRoom] = useState([]);
  const showRoom = (e) => {
    const buttonId = e.target.id;
    const axiosConfigRoom = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms/" + buttonId,
    };
    axios(axiosConfigRoom).then((res) => {
      setEditedRoom(res.data.chatRoom);
    });
  };

  return (
    <div className="container d-flex justify-content-center">
      <table className="table table-sm table-dark w-50">
        <thead>
          <tr>
            <th colSpan={3}> Rooms </th>
          </tr>
        </thead>
        <tbody>
          {props.rooms.map((room, index) => {
            return (
              <tr key={index}>
                <td> {room.name}</td>
                <td>
                  <button
                    id={room._id}
                    className="btn btn-primary w-100"
                    onClick={showRoom}
                    data-toggle="modal"
                    data-target="#edit-room"
                  >
                    EDIT
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger w-75"> DELETE </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditCreateRoomModal
        id="edit-room"
        sectionName="Edit"
        postSuffix={editedRoom._id}
        availableRanges={props.availableRanges}
        editedRoom={editedRoom}
      />
    </div>
  );
}

export default UserRoomsList;
