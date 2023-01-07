import "./style.css";
import React from "react";
import UserRoomsList from "./UserRoomsList";
import useAcciosHook from "../../hooks/useAcciosHook";

function Rooms() {
  const { response: roomsRes, loading: loadingRooms } = useAcciosHook({
    url: `/rooms`,
    method: "get",
    withCredentials: true,
  });
  const { response: rangesRes, loading: loadingRanges } = useAcciosHook({
    url: `/ranges`,
    method: "get",
    withCredentials: true,
  });
  const { response: usersRes, loading: loadingUsers } = useAcciosHook({
    url: `/users`,
    method: "get",
    withCredentials: true,
  });

  const rooms = roomsRes?.data.usersRooms as IChatRoomRes[];
  const ranges = rangesRes?.data.ranges as IRangeRes[];
  const users = usersRes?.data.users as IUserRes[];

  return (
    <div>
      <div className="section-header">
        <h1> Your rooms </h1>
      </div>
      {!loadingRanges || !loadingRooms || !loadingUsers ? (
        <UserRoomsList rooms={rooms} ranges={ranges} users={users} />
      ) : (
        <div className="section-header">
          <h1> Fetching data... </h1>
        </div>
      )}
    </div>
  );
}

export default Rooms;
