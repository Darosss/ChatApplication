import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRoomsList from "./UserRoomsList";
import EditCreateRoomModal from "./EditCreateRoomModal";
function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [ranges, setRanges] = useState([]);
  useEffect(() => {
    const axiosConfigRooms = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms",
    };
    axios(axiosConfigRooms).then((res) => {
      setRooms(res.data.usersRooms);
    });
    const axiosConfigCreateRoom = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms/create",
    };
    axios(axiosConfigCreateRoom).then((res) => {
      setRanges(res.data.availableRanges);
    });
  }, []);

  const createRoomPopup = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <div className="d-inline-flex">
          <div className="m-1">Your chat rooms</div>
          <button
            className="btn btn-primary"
            onClick={createRoomPopup}
            data-toggle="modal"
            data-target="#create-room"
          >
            NEW ROOM
          </button>
        </div>
        {
          <EditCreateRoomModal
            id="create-room"
            sectionName="Create"
            postSuffix="create"
            availableRanges={ranges}
          />
        }
        {<UserRoomsList rooms={rooms} availableRanges={ranges} />}
      </header>
    </div>
  );
}

export default Rooms;
