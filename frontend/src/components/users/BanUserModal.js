import React, { useState } from "react";
import ModalCore from "../Modal";
import axios from "axios";

function EditUserModal(props) {
  const [show, setShow] = useState(false);

  const [banTime, setBanTime] = useState("");
  // TODO: add ban info

  const [postInfo, setPostInfo] = useState("");

  const banUser = () => {
    const axiosConfig = {
      method: "post",
      data: {
        banTime: banTime,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/ban/" + props.userId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const modalBody = () => {
    return (
      <div>
        <label className="form-label ">Ban time (empty = 5min)</label>
        <input
          type="number"
          className="form-control"
          value={banTime || ""}
          onChange={(e) => setBanTime(e.target.value)}
        />
        <p className="text-danger font-weight-bold"> {postInfo} </p>
      </div>
    );
  };

  return (
    <ModalCore actionName="Ban user" body={modalBody()} onClickFn={banUser} />
  );
}

export default EditUserModal;
