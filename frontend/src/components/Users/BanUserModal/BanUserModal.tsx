import "./style.css";
import React, { useState } from "react";
import ModalCore from "../../Modal";
import axios from "axios";

function EditUserModal(props) {
  const [banTime, setBanTime] = useState("");
  const [banReason, setBanReason] = useState("");

  const [postInfo, setPostInfo] = useState("");

  const banUser = () => {
    const axiosConfig = {
      method: "post",
      data: {
        banTime: banTime,
        banReason: banReason,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/users/ban/` + props.userId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);

      window.location.reload(false);
    });
  };

  const modalBody = () => {
    return (
      <div>
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
