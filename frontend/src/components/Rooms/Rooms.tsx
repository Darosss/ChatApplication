import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRoomsList from "./UserRoomsList";

function Rooms() {
  const [rooms, setRooms] = useState<IChatRoomRes[]>();

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
    <div>
      <div className="section-header">
        <h1> Your rooms </h1>
      </div>
      {rooms ? <UserRoomsList rooms={rooms} /> : null}
    </div>
  );
}

export default Rooms;
