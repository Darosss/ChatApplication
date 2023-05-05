import React, { useContext } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useDeleteRoom } from "@hooks/roomsApi";
import { useRefetchData } from "@hooks/useAcciosHook";

function DeleteRoomModal(props: { roomId: string }) {
  const { roomId } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const { roomDeleteResponse, roomDeleteError, deleteRoom } = useDeleteRoom(roomId);

  const { postInfo } = usePostInfoHook(roomDeleteResponse?.data.message, roomDeleteError?.message);

  useRefetchData(roomDeleteResponse, refetchData);

  const handleOnDeleteRoom = () => {
    deleteRoom();
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
