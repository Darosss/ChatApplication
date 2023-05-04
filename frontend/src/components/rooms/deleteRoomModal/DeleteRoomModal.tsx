import React, { useContext } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useDeleteRoom } from "@hooks/roomsApi";

function DeleteRoomModal(props: { roomId: string }) {
  const { roomId } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const { roomDeleteResponse, roomDeleteError, deleteRoom } = useDeleteRoom(roomId);

  const { postInfo } = usePostInfoHook(roomDeleteResponse?.data.message, roomDeleteError?.message);

  const handleOnDeleteRoom = () => {
    deleteRoom().then(() => {
      refetchData();
    });
  };

  return (
    <ModalCore
      actionName="Delete room"
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
