import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRoomsList from "./UserRoomsList";
import EditCreateRoomModal from "./EditCreateRoomModal";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const axiosConfigRooms = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/rooms`,
    };
    axios(axiosConfigRooms).then((res) => {
      setRooms(res.data.usersRooms);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="m-1">Your chat rooms</div>
          <EditCreateRoomModal sectionName="Create" />
        </div>
        {}
        {<UserRoomsList rooms={rooms} />}
      </header>
    </div>
  );
}

export default Rooms;
