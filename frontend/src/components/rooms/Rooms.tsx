import React from "react";
import UserRoomsList from "./userRoomsList";
import useAcciosHook from "@hooks/useAcciosHook";
import { SendDataContext } from "@contexts/SendDataContext";

function Rooms() {
  const { response: roomsRes, sendData: refetchRooms } = useAcciosHook<{ usersRooms: IChatRoomRes[] }>({
    url: `/rooms`,
    method: "get",
    withCredentials: true,
  });
  const { response: rangesRes } = useAcciosHook<{ ranges: IRangeRes[] }>({
    url: `/ranges`,
    method: "get",
    withCredentials: true,
  });
  const { response: usersRes } = useAcciosHook<{ users: IUserRes[] }>({
    url: `/users`,
    method: "get",
    withCredentials: true,
  });

  const rooms = roomsRes?.data.usersRooms;
  const ranges = rangesRes?.data.ranges;
  const users = usersRes?.data.users;

  return (
    <SendDataContext.Provider value={{ sendData: refetchRooms }}>
      <div>
        <div className="section-header">
          <h1> Your rooms </h1>
        </div>
        {rooms && ranges && users ? (
          <UserRoomsList rooms={rooms} ranges={ranges} users={users} />
        ) : (
          <div className="section-header">
            <h1> Fetching data... </h1>
          </div>
        )}
      </div>
    </SendDataContext.Provider>
  );
}

export default Rooms;
