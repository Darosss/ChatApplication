import React, { useEffect, useState } from "react";
import axios from "axios";

function EditRangeModal(props) {
  const [rangeId, setRangeId] = useState("");
  const [rangeName, setRangeName] = useState("");
  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!props.rangeId) return;
    setRangeId(props.rangeId);
  }, [props]);

  useEffect(() => {
    if (!rangeId) return;

    console.log(rangeId);
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/ranges/" + rangeId,
    };

    axios(axiosConfig).then((res) => {
      const range = res.data.range;
      setRangeName(range.name);
    });
  }, [rangeId]);

  const editRange = () => {
    const axiosEditRange = {
      method: "post",
      data: {
        name: rangeName,
      },
      withCredentials: true,
      url: "http://localhost:5000/ranges/edit/" + rangeId,
    };
    axios(axiosEditRange).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const createModalBody = () => {
    return (
      <div>
        <div>
          <label className="form-label ">Range name</label>
          <input
            type="text"
            className="form-control"
            value={rangeName || ""}
            onChange={(e) => setRangeName(e.target.value)}
          />
        </div>
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
        aria-labelledby="edit-range-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="edit-range-modal">
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
                onClick={editRange}
                className="btn btn-primary"
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

export default EditRangeModal;
