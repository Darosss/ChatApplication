import React, { useEffect, useState } from "react";
import UserRoomsList from "./userRoomsList";
import { SendDataContext } from "@contexts/SendDataContext";
import { useGetUsers } from "@hooks/usersApi";
import { useGetRanges } from "@hooks/rangesApi";
import { useGetRooms } from "@hooks/roomsApi";

function Rooms() {
  const { roomsResponse, refetchRooms } = useGetRooms();
  const { rangesResponse } = useGetRanges();
  const { usersResponse } = useGetUsers();

  const [rooms, setRooms] = useState<IChatRoomRes[]>([]);
  const [ranges, setRanges] = useState<IRangeRes[]>([]);
  const [users, setUsers] = useState<IUserRes[]>([]);

  useEffect(() => {
    if (roomsResponse) setRooms(roomsResponse.data.rooms);
  }, [roomsResponse]);

  useEffect(() => {
    if (rangesResponse) setRanges(rangesResponse.data.ranges);
  }, [rangesResponse]);

  useEffect(() => {
    if (usersResponse) setUsers(usersResponse.data.users);
  }, [usersResponse]);

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
