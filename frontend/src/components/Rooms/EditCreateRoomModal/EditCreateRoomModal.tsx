import "./style.css";
import React, { useState, useEffect } from "react";
import ModalCore from "@components/Modal";
import useAcciosHook from "@hooks/useAcciosHook";

function EditCreateRoomModal(props: {
  room?: IChatRoomRes;
  ranges?: IRangeRes[];
  users?: IUserRes[];
  sectionName: string;
  isEdit?: boolean;
}) {
  const { room = undefined, sectionName = "", ranges, users } = props;

  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState<string[]>();
  const [roomAllowedUsers, setRoomAllowedUsers] = useState<string[]>();
  const [roomBannedUsers, setRoomBannedUsers] = useState<string[]>();

  const { response, error, sendData } = useAcciosHook(
    {
      url: "rooms" + (room ? `/edit/${room._id}` : "/create"),
      method: "post",
      withCredentials: true,
      data: {
        roomName: roomName,
        availableRanges: roomRanges,
        allowedUsers: roomAllowedUsers,
        bannedUsers: roomBannedUsers,
      },
    },
    true,
  );

  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    setPostInfo(response?.data.message);
  }, [response]);

  useEffect(() => {
    if (error) setPostInfo(error.message);
  }, [error]);

  useEffect(() => {
    if (!room) return; //if roomId = undefined is not editing so return
    setRoomName(room.name);
    setRoomRanges(room.availableRanges);
    setRoomAllowedUsers(room.allowedUsers);
    setRoomBannedUsers(room.bannedUsers);
  }, [room]);

  const createOrEdit = () => {
    sendData();
  };

  const createSelect = (
    label: string,
    setState: any,
    funcOptions: any, // TODO: add JSX element as function
    selectValue: any, // TODO: add state type
  ) => {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select
          className="form-select bg-dark text-light"
          id="room-ranges"
          multiple
          value={selectValue}
          aria-label={"multiple select " + label}
          onChange={(e) => handleMultipleSelect(e.target.selectedOptions, setState)}
        >
          {funcOptions()}
        </select>
      </div>
    );
  };

  const createSelectRangesOptions = () => {
    return ranges?.map((range, index) => {
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };

  const createSelectUsersListOptions = () => {
    return users?.map((user, index) => {
      return (
        <option key={index} value={user._id}>
          {user.username}
        </option>
      );
    });
  };
  const handleMultipleSelect = (options: any, setState: (arg: any) => void /* TODO: add type for state */) => {
    const selectedOptions = [...options].map((option) => option.value);
    setState(selectedOptions);
  };

  const createNameRoomInput = () => {
    return (
      <div>
        <label className="form-label">Room name</label>
        <input
          name="name"
          id="room-name"
          type="text"
          className="form-control"
          value={roomName || ""}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
    );
  };
  const modalBody = () => {
    return (
      <div>
        {createNameRoomInput()}

        {createSelect("Available ranges", setRoomRanges, createSelectRangesOptions, roomRanges)}
        {createSelect("Allow users", setRoomAllowedUsers, createSelectUsersListOptions, roomAllowedUsers)}
        {createSelect("Ban users", setRoomBannedUsers, createSelectUsersListOptions, roomBannedUsers)}
      </div>
    );
  };

  return (
    <ModalCore
      actionName={sectionName}
      body={modalBody()}
      onClickFn={createOrEdit}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditCreateRoomModal;
