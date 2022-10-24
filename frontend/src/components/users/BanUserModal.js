import React, { useEffect, useState } from "react";
import axios from "axios";

function EditUserModal(props) {
  const [userId, setUserId] = useState("");
  const [banTime, setBanTime] = useState("");
  // add ban info

  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!props.userId) return;
    setUserId(props.userId);
  }, [props]);

  const banUser = () => {
    const axiosConfig = {
      method: "post",
      data: {
        banTime: banTime,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/ban/" + userId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);
    });
  };

  const createModalBody = () => {
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

  const createModal = () => {
    return (
      <div
        className="modal fade"
        id={props.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createRoomLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="createRoomLabel">
                {props.sectionName}
              </h5>
              <button
                className="close bg-secondary"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{createModalBody()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={banUser}
                className="btn btn-danger"
              >
                {props.sectionName}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return createModal();
}

export default EditUserModal;
