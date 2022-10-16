import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRoomsList from "./UserRoomsList";
function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/rooms",
    };

    axios(axiosConfig).then((res) => {
      console.log(res);
      setRooms(res.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Your chat rooms</p>
        {<UserRoomsList rooms={rooms} />}
      </header>
    </div>
  );
}

export default Rooms;
