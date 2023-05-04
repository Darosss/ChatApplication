import React, { useContext, useState } from "react";
import ModalCore from "@components/modal";
import useAcciosHook from "@hooks/useAcciosHook";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { SendDataContext } from "@contexts/SendDataContext";

function EditUserModal(props: { userId: string; username: string }) {
  const { userId, username } = props;

  const { sendData: refetchData } = useContext(SendDataContext);
  const [banTime, setBanTime] = useState("");
  const [banReason, setBanReason] = useState("");

  const {
    response: banResponse,
    error: banError,
    sendData: banUser,
  } = useAcciosHook<{ message: string; user: IUserRes }>({
    url: `/users/admin/ban/${userId}`,
    method: "patch",
    withCredentials: true,
    data: {
      banTime: banTime,
      banReason: banReason,
    },
  });
  const { postInfo } = usePostInfoHook(banResponse?.data.message, banError?.message);

  const handleOnClickBanUser = () => {
    banUser().then(() => {
      refetchData();
    });
  };

  const modalBody = () => {
    return (
      <div>
        <div>
          <label>
            Ban user: <b>{username}</b>
          </label>
        </div>
        <label className="form-label ">Ban time(minutes) (empty = 5min)</label>
        <input
          type="number"
          className="form-control"
          value={banTime || ""}
          onChange={(e) => setBanTime(e.target.value)}
        />
        <label className="form-label ">Ban reason</label>
        <input
          type="text"
          className="form-control"
          value={banReason || ""}
          onChange={(e) => setBanReason(e.target.value)}
        />
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Ban user"
      body={modalBody()}
      onClickFn={handleOnClickBanUser}
      actionBtnVariant="danger"
      postInfo={postInfo}
      closeOnSubmit={true}
    />
  );
}

export default EditUserModal;
