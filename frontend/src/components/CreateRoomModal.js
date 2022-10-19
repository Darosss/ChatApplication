import React, { useState } from "react";
function CreateRoomModal(props) {
  console.log(props);
  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState([]);

  const createRoomForm = () => {
    return <form></form>;
    // TODO Create room forms
  };

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
              Create room
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{createRoomForm()}</div>
          <div className="modal-footer">
            Name
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomModal;
