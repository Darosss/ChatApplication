import React, { useEffect, useState } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";

function UnbanUserModal(props: { userId: string; username: string }) {
  const { userId, username } = props;

  const [postInfo, setPostInfo] = useState("");

  const {
    response: unbanResponse,
    error: unbanError,
    sendData: unbanUser,
  } = useAcciosHook({ url: `/users/admin/unban/${userId}`, method: "patch", withCredentials: true });

  useEffect(() => {
    if (unbanResponse) setPostInfo(unbanResponse?.data.message);
  }, [unbanResponse]);

  useEffect(() => {
    if (unbanError) setPostInfo(unbanError.message);
  }, [unbanError]);

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
      body={modalBody()}
      onClickFn={unbanUser}
      actionBtnVariant="secondary"
      postInfo={postInfo}
    />
  );
}

export default UnbanUserModal;
