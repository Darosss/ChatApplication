import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import EditCreateRoomModal from "@components/rooms/editCreateRoomModal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { IChatRoomRes, IUserRes, IRangeRes } from "src/@types/types";

interface UserRoomsProps {
  userRooms: IChatRoomRes[];
  usersList: IUserRes[];
  rangesList: IRangeRes[];
}
function UserRooms(props: UserRoomsProps) {
  const { usersList, userRooms, rangesList } = props;
  return (
    <DropdownButton as={ButtonGroup} title="User rooms" drop="up" className="w-100">
      <div className="d-flex flex-row flex-wrap">
        {userRooms.map((room, index) => {
          return (
            <div key={index} className="w-50 p-1">
              <EditCreateRoomModal sectionName={room.name} room={room} ranges={rangesList} users={usersList} />
              <Dropdown.Divider />
            </div>
          );
        })}
      </div>
    </DropdownButton>
  );
}

export default UserRooms;
