import React, { useState } from "react";
import axios from "axios";
function DeleteRoomModal(props) {
  const [postInfo, setPostInfo] = useState("");

  const deleteRoom = () => {
    const axiosCreateConfig = {
      method: "delete",
      withCredentials: true,
      url: "http://localhost:5000/rooms/delete/" + props.postSuffix,
    };
    axios(axiosCreateConfig).then((res) => {
      setPostInfo(res.data.message);
    });
  };

  const createModalBody = () => {
    return (
      <div>
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
                Delete room {props.roomName}
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
                onClick={deleteRoom}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return createModal();
}

export default DeleteRoomModal;
