import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRoomsList from "./UserRoomsList";
import CreateRoomModal from "./CreateRoomModal";
function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [ranges, setRanges] = useState([]);
  useEffect(() => {
    const axiosConfigRooms = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms",
    };
    const axiosConfigCreateRooms = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms/create",
    };
    axios(axiosConfigRooms).then((res) => {
      console.log(res);
      setRooms(res.data.usersRooms);
    });
    axios(axiosConfigCreateRooms).then((res) => {
      setRanges(res.data.availableRanges);
    });
  }, []);

  const createRoomPopup = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <div className="d-inline-flex">
          <div className="m-1">Your chat rooms </div>
          <button
            className="btn btn-primary"
            onClick={createRoomPopup}
            data-toggle="modal"
            data-target="#createRoom"
          >
            NEW ROOM
          </button>
        </div>
        {<CreateRoomModal id="createRoom" availableRanges={ranges} />}
        {<UserRoomsList rooms={rooms} />}
      </header>
    </div>
  );
}

export default Rooms;
