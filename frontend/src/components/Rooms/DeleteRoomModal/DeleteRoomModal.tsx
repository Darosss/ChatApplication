import "./style.css";
import { useState } from "react";
import ModalCore from "../../Modal";
import axios from "axios";

function DeleteRoomModal(props: { roomId: string }) {
  const { roomId } = props;
  const [postInfo, setPostInfo] = useState("");

  const deleteRoom = () => {
    const axiosCreateConfig = {
      method: "delete",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/rooms/delete/` + roomId,
    };
    axios(axiosCreateConfig).then((res) => {
      setPostInfo(res.data.message);

      window.location.reload();
    });
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
