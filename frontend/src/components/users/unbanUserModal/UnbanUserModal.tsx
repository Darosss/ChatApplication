import React, { useContext } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { SendDataContext } from "@contexts/SendDataContext";

function UnbanUserModal(props: { userId: string; username: string }) {
  const { userId, username } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const {
    response: unbanResponse,
    error: unbanError,
    sendData: unbanUser,
  } = useAcciosHook<{ message: string; user: IUserRes }>({
    url: `/users/admin/unban/${userId}`,
    method: "patch",
    withCredentials: true,
  });

  const { postInfo } = usePostInfoHook(unbanResponse?.data.message, unbanError?.message);

  const handleOnClickUnbanUser = () => {
    unbanUser().then(() => {
      refetchData();
    });
  };

  const modalBody = () => {
    return (
      <div>
        Unban user: <b>{username}</b>
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Unban user"
      onClickFn={handleOnClickUnbanUser}
      actionBtnVariant="secondary"
      postInfo={postInfo}
      closeOnSubmit={true}
    >
      {modalBody()}
    </ModalCore>
  );
}

export default UnbanUserModal;
