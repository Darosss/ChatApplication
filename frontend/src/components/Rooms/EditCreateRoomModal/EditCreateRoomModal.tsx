import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCore from "../../Modal";

function EditCreateRoomModal(props: {
  roomId?: string;
  sectionName: string;
  isEdit?: boolean;
}) {
  const { roomId = undefined, sectionName = "" } = props;

  const [usersList, setUsersList] = useState<IUserRes[]>();
  const [availableRanges, setAvailableRanges] = useState<IRangeRes[]>();

  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState<IRangeRes[]>();
  const [roomAllowedUsers, setRoomAllowedUsers] = useState<IUserRes[]>();
  const [roomBannedUsers, setRoomBannedUsers] = useState<IUserRes[]>();

  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!roomId) return;
    const axiosConfigRoom = {
      method: "get",
      withCredentials: true,
      url:
        `${process.env.REACT_APP_API_URI}/rooms/` +
        (roomId ? roomId : "create"),
    };
    axios(axiosConfigRoom).then((res) => {
      setUsersList(res.data.usersList);
      setAvailableRanges(res.data.availableRanges);
      if (!roomId) return; //if roomId = undefined is not editing so return

      setRoomName(res.data.chatRoom.name);
      setRoomRanges(res.data.chatRoom.availableRanges);
      setRoomAllowedUsers(res.data.chatRoom.allowedUsers);
      setRoomBannedUsers(res.data.chatRoom.bannedUsers);
    });
  }, [roomId]);

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
        `${process.env.REACT_APP_API_URI}/rooms/` +
        (roomId ? roomId : "create"),
    };
    axios(axiosCreateConfig).then((res) => {
      setPostInfo(res.data.message);

      window.location.reload();
    });
  };

  const createSelect = (
    label: string,
    setState: any,
    funcOptions: any, // TODO: add JSX element as function
    selectValue: any // TODO: add state type
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
    return availableRanges?.map((range, index) => {
      console.log("testranga", range, range.id, range._id);
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };

  const createSelectUsersListOptions = () => {
    return usersList?.map((user, index) => {
      return (
        <option key={index} value={user._id}>
          {user.username}
        </option>
      );
    });
  };
  const handleMultipleSelect = (
    options: any,
    setState: (arg: any) => void /* TODO: add type for state */
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
      actionName={sectionName}
      body={modalBody()}
      onClickFn={createOrEdit}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditCreateRoomModal;
