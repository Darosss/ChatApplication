import "./style.css";
import React, { useEffect, useState } from "react";
import ModalCore from "../../Modal";
import useAcciosHook from "../../../hooks/useAcciosHook";

function EditUserModal(props: { userId: string; username: string }) {
  const { userId, username } = props;
  const [banTime, setBanTime] = useState("");
  const [banReason, setBanReason] = useState("");

  const [postInfo, setPostInfo] = useState("");

  const {
    response: banResponse,
    error: banError,
    sendData: banUser,
  } = useAcciosHook({
    url: `/users/admin/ban/${userId}`,
    method: "post",
    withCredentials: true,
    data: {
      banTime: banTime,
      banReason: banReason,
    },
  });

  useEffect(() => {
    if (banResponse) setPostInfo(banResponse?.data.message);
  }, [banResponse]);

  useEffect(() => {
    if (banError) setPostInfo(banError.message);
  }, [banError]);

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
      onClickFn={banUser}
      actionBtnVariant="danger"
      postInfo={postInfo}
    />
  );
}

export default EditUserModal;
