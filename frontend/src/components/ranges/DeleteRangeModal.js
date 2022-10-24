import React, { useEffect, useState } from "react";
import axios from "axios";

function DeleteRangeModal(props) {
  const [rangeId, setRangeId] = useState("");

  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!props.rangeId) return;
    setRangeId(props.rangeId);
  }, [props]);

  const deleteRange = () => {
    const axiosConfig = {
      method: "delete",
      withCredentials: true,
      url: "http://localhost:5000/ranges/delete/" + rangeId,
    };

    axios(axiosConfig).then((res) => {
      setPostInfo(res.data.message);
    });
  };

  const createModalBody = () => {
    return (
      <div>
        <label className="form-label ">{props.sectionName}</label>
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
        aria-labelledby="delete-range-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="delete-range-label">
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
                onClick={deleteRange}
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

export default DeleteRangeModal;
