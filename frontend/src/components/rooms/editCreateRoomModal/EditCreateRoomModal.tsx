import React, { useState, useEffect, useContext } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useCreateOrUpdateRoom } from "@hooks/roomsApi";

function EditCreateRoomModal(props: {
  room?: IChatRoomRes;
  ranges?: IRangeRes[];
  users?: IUserRes[];
  sectionName: string;
  isEdit?: boolean;
}) {
  const { room, sectionName = "", ranges, users } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState<string[]>([]);
  const [roomAllowedUsers, setRoomAllowedUsers] = useState<string[]>([]);
  const [roomBannedUsers, setRoomBannedUsers] = useState<string[]>([]);

  const { response, error, sendData } = useCreateOrUpdateRoom(
    {
      name: roomName,
      availableRanges: roomRanges,
      allowedUsers: roomAllowedUsers,
      bannedUsers: roomBannedUsers,
    },
    room?._id,
  );
  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  useEffect(() => {
    if (!room) return;
    setRoomName(room.name);
    setRoomRanges(room.availableRanges);
    setRoomAllowedUsers(room.allowedUsers);
    setRoomBannedUsers(room.bannedUsers);
  }, [room]);

  const handleOnCreateEditRoom = () => {
    sendData().then(() => {
      refetchData();
    });
  };

  const createSelect = (
    label: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
    funcOptions: () => JSX.Element[] | undefined,
    selectValue: string[] | undefined,
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
  const handleMultipleSelect = (
    options: HTMLCollectionOf<HTMLOptionElement>,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
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
      onClickFn={handleOnCreateEditRoom}
      actionBtnVariant="primary"
      postInfo={postInfo}
    >
      {modalBody()}
    </ModalCore>
  );
}

export default EditCreateRoomModal;
