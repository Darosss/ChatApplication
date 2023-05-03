import "./style.css";
import React, { useEffect, useState } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";

function DeleteRoomModal(props: { roomId: string }) {
  const { roomId } = props;
  const [postInfo, setPostInfo] = useState("");

  const { response, sendData: deleteRoom } = useAcciosHook({
    url: `rooms/delete/${roomId}`,
    method: "delete",
    withCredentials: true,
  });

  useEffect(() => {
    setPostInfo(response?.data.message);
  }, [response]);

  return (
    <ModalCore actionName="Delete room" body="" onClickFn={deleteRoom} actionBtnVariant="danger" postInfo={postInfo} />
  );
}

export default DeleteRoomModal;
