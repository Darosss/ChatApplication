import React, { useState, useEffect, useContext } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useCreateOrUpdateRoom } from "@hooks/roomsApi";
import { useRefetchData } from "@hooks/useAcciosHook";
import RoomForm from "./RoomForm";
import PostInfo from "@components/postInfo";

function EditCreateRoomModal(props: {
  room?: IChatRoomRes;
  ranges?: IRangeRes[];
  users?: IUserRes[];
  sectionName: string;
  isEdit?: boolean;
}) {
  const { room, sectionName = "", ranges, users } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const [roomValues, setRoomValues] = useState<RoomUpdateData>({
    name: "",
    availableRanges: [],
    allowedUsers: [],
    bannedUsers: [],
  });

  const { response, error, sendData } = useCreateOrUpdateRoom(room?._id);
  const { postInfo } = usePostInfoHook(response?.data.message, error?.message);

  useRefetchData(response, refetchData);

  useEffect(() => {
    if (!room) return;
    setRoomValues(room);
  }, [room]);

  if (!ranges || !users) return null;

  return (
    <ModalCore actionName={sectionName} actionBtnVariant="primary" postInfo={postInfo} form={true}>
      <RoomForm
        initialValues={roomValues}
        onSubmit={sendData<RoomUpdateData>}
        rangesList={ranges}
        usersList={users}
        actionName={sectionName}
      />

      <PostInfo info={postInfo} />
    </ModalCore>
  );
}

export default EditCreateRoomModal;
