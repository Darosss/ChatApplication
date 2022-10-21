import React, { useEffect, useState } from "react";
import axios from "axios";
function EditCreateRoomModal(props) {
  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState([]);
  const [roomAllowedUsers, setRoomAllowedUsers] = useState([]);
  const [roomBannedUsers, setRoomBannedUsers] = useState([]);
  const [postInfo, setPostInfo] = useState("");
  useEffect(() => {
    if (props.editedRoom) {
      setRoomName(props.editedRoom.name);
      setRoomRanges(props.editedRoom.availableRanges);
      setRoomBannedUsers(props.editedRoom.bannedUsers);
      setRoomAllowedUsers(props.editedRoom.allowedUsers);
    }
  }, [props]);

  const createNewRoom = () => {
    const axiosCreateConfig = {
      method: "post",
      data: {
        roomName: roomName,
        availableRanges: roomRanges,
        allowedUsers: roomAllowedUsers,
        bannedUsers: roomBannedUsers,
      },
      withCredentials: true,
      url: "http://localhost:5000/rooms/" + props.postSuffix,
    };
    axios(axiosCreateConfig).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const createSelect = (label, funcOnChange, funcOptions, selectValue) => {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select
          className="form-select bg-dark text-light"
          id="room-ranges"
          multiple
          value={selectValue}
          aria-label={"multiple select " + label}
          onChange={(e) => funcOnChange(e.target.selectedOptions)}
        >
          {funcOptions()}
        </select>
      </div>
    );
  };

  const createSelectRangesOptions = () => {
    return props.availableRanges.map((range, index) => {
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };
  const createSelectUsersListOptions = () => {
    return props.usersList.map((user, index) => {
      return (
        <option key={index} value={user._id}>
          {user.username}
        </option>
      );
    });
  };
  /* FIXME remove repeat */
  const handleMultipleSelectRanges = (options) => {
    const selectedOptions = [...options].map((option) => option.value);
    setRoomRanges(selectedOptions);
  };
  const handleMultipleSelectUsers = (options) => {
    const selectedOptions = [...options].map((option) => option.value);
    setRoomAllowedUsers(selectedOptions);
  };
  const handleMultipleSelectBannedUsers = (options) => {
    const selectedOptions = [...options].map((option) => option.value);
    setRoomBannedUsers(selectedOptions);
  };
  /* FIXME Repeat */

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
  const createModalBody = () => {
    return (
      <div>
        {createNameRoomInput()}

        {createSelect(
          "Available ranges",
          handleMultipleSelectRanges,
          createSelectRangesOptions,
          roomRanges
        )}
        {createSelect(
          "Allow users",
          handleMultipleSelectUsers,
          createSelectUsersListOptions,
          roomAllowedUsers
        )}
        {createSelect(
          "Ban users",
          handleMultipleSelectBannedUsers,
          createSelectUsersListOptions,
          roomBannedUsers
        )}
        <p className="text-danger font-weight-bold"> {postInfo} </p>
      </div>
    );
  };

  const createModal = () => {
    return (
      <div
        className="modal fade"
        id={props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createRoomLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="createRoomLabel">
                {props.sectionName}
              </h5>
              <button
                className="close bg-secondary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{createModalBody()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={createNewRoom}
                className="btn btn-primary"
              >
                {props.sectionName}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return createModal();
}

export default EditCreateRoomModal;
