import React, { useState } from "react";
import axios from "axios";
import EditCreateRoomModal from "./EditCreateRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";

function UserRoomsList(props) {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [availableRanges, setAvailableRanges] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const showRoom = (e) => {
    const buttonId = e.target.id;
    const axiosConfigRoom = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms/" + buttonId,
    };
    axios(axiosConfigRoom).then((res) => {
      setSelectedRoom(res.data.chatRoom);
      setAvailableRanges(res.data.availableRanges);
      setUsersList(res.data.usersList);
    });
  };

  const getRemoveRoom = (e) => {
    const buttonId = e.target.id;
    const axiosConfigRoom = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms/delete/" + buttonId,
    };
    axios(axiosConfigRoom).then((res) => {
      console.log(res, "delete");
      setSelectedRoom(res.data.chatRoomDelete);
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
                  <button
                    id={room._id}
                    className="btn btn-danger w-100"
                    onClick={getRemoveRoom}
                    data-toggle="modal"
                    data-target="#remove-room"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditCreateRoomModal
        id="edit-room"
        sectionName="Edit"
        postSuffix={selectedRoom._id}
        availableRanges={availableRanges}
        editedRoom={selectedRoom}
        usersList={usersList}
      />
      <DeleteRoomModal
        id="remove-room"
        roomName={selectedRoom.name}
        postSuffix={selectedRoom._id}
      />
    </div>
  );
}

export default UserRoomsList;
