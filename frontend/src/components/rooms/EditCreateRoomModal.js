import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalCore from "../Modal";

function EditCreateRoomModal(props) {
  const [usersList, setUsersList] = useState([]);
  const [availableRanges, setAvailableRanges] = useState([]);

  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState([]);
  const [roomAllowedUsers, setRoomAllowedUsers] = useState([]);
  const [roomBannedUsers, setRoomBannedUsers] = useState([]);

  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    const axiosConfigRoom = {
      method: "get",
      withCredentials: true,
      url:
        "http://localhost:5000/rooms/" +
        (props.roomId ? props.roomId : "create"),
    };
    axios(axiosConfigRoom).then((res) => {
      setUsersList(res.data.usersList);
      setAvailableRanges(res.data.availableRanges);
      if (!props.roomId) return; //if roomId = undefined is not editing so return

      setRoomName(res.data.chatRoom.name);
      setRoomRanges(res.data.chatRoom.availableRanges);
      setRoomAllowedUsers(res.data.chatRoom.allowedUsers);
      setRoomBannedUsers(res.data.chatRoom.bannedUsers);
    });
  }, [props]);

  const createOrEdit = () => {
    const axiosCreateConfig = {
      method: "post",
      data: {
        roomName: roomName,
        availableRanges: roomRanges,
        allowedUsers: roomAllowedUsers,
        bannedUsers: roomBannedUsers,
      },
      withCredentials: true,
      url:
        "http://localhost:5000/rooms/" +
        (props.roomId ? props.roomId : "create"),
    };
    axios(axiosCreateConfig).then((res) => {
      setPostInfo(res.data.message);
    });
  };

  const createSelect = (label, setState, funcOptions, selectValue) => {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select
          className="form-select bg-dark text-light"
          id="room-ranges"
          multiple
          value={selectValue}
          aria-label={"multiple select " + label}
          onChange={(e) =>
            handleMultipleSelect(e.target.selectedOptions, setState)
          }
        >
          {funcOptions()}
        </select>
      </div>
    );
  };

  const createSelectRangesOptions = () => {
    return availableRanges.map((range, index) => {
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };

  const createSelectUsersListOptions = () => {
    return usersList.map((user, index) => {
      return (
        <option key={index} value={user._id}>
          {user.username}
        </option>
      );
    });
  };
  const handleMultipleSelect = (options, setState) => {
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

        {createSelect(
          "Available ranges",
          setRoomRanges,
          createSelectRangesOptions,
          roomRanges
        )}
        {createSelect(
          "Allow users",
          setRoomAllowedUsers,
          createSelectUsersListOptions,
          roomAllowedUsers
        )}
        {createSelect(
          "Ban users",
          setRoomBannedUsers,
          createSelectUsersListOptions,
          roomBannedUsers
        )}
      </div>
    );
  };

  return (
    <ModalCore
      actionName={props.sectionName}
      body={modalBody()}
      onClickFn={createOrEdit}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditCreateRoomModal;
