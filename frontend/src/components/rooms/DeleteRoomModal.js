import React, { useState } from "react";
import ModalCore from "../Modal";
import axios from "axios";

function DeleteRoomModal(props) {
  const [postInfo, setPostInfo] = useState("");

  const deleteRoom = () => {
    const axiosCreateConfig = {
      method: "delete",
      withCredentials: true,
      url: "http://localhost:5000/rooms/delete/" + props.roomId,
    };
    axios(axiosCreateConfig).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  return (
    <ModalCore
      actionName="Delete room"
      body=""
      onClickFn={deleteRoom}
      actionBtnVariant="danger"
      postInfo={postInfo}
    />
  );
}

export default DeleteRoomModal;
