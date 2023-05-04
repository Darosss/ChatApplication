import React, { useContext } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";

function DeleteRoomModal(props: { roomId: string }) {
  const { roomId } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const {
    response,
    error,
    sendData: deleteRoom,
  } = useAcciosHook<{ message: string }>({
    url: `rooms/delete/${roomId}`,
    method: "delete",
    withCredentials: true,
  });

  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  const handleOnDeleteRoom = () => {
    deleteRoom().then(() => {
      refetchData();
    });
  };

  return (
    <ModalCore
      actionName="Delete room"
      body=""
      onClickFn={() => {
        handleOnDeleteRoom();
      }}
      actionBtnVariant="danger"
      postInfo={postInfo}
      closeOnSubmit={true}
    />
  );
}

export default DeleteRoomModal;
