import React, { useEffect, useState } from "react";
import axios from "axios";
function EditCreateRoomModal(props) {
  const [roomName, setRoomName] = useState("");
  const [roomRanges, setRoomRanges] = useState([]);
  const [createInfo, setCreateInfo] = useState("");

  useEffect(() => {
    if (props.editedRoom) {
      setRoomName(props.editedRoom.name);
      setRoomRanges(props.editedRoom.availableRanges);
    }
  }, [props]);

  const createNewRoom = () => {
    const axiosCreateConfig = {
      method: "post",
      data: {
        roomName: roomName,
        availableRanges: roomRanges,
      },
      withCredentials: true,
      url: "http://localhost:5000/rooms/" + props.postSuffix,
    };
    axios(axiosCreateConfig).then((res) => {
      setCreateInfo(res.data.message);
    });
  };

  const createSelectRanges = () => {
    return props.availableRanges.map((range, index) => {
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };

  const handleMultipleSelectChange = (options) => {
    const selectedOptions = [...options].map((option) => option.value);
    setRoomRanges(selectedOptions);
  };

  const createRoomInputs = () => {
    return (
      <div>
        <label className="form-label">Room name</label>
        <input
          name="name"
          id="room-name"
          type="text"
          className="form-control"
          value={roomName || ""}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <label className="form-label">
          Available ranges(ctrl + click to select more)
        </label>

        <select
          className="form-select bg-dark text-light"
          id="room-ranges"
          multiple
          value={roomRanges}
          aria-label="multiple select example"
          onChange={(e) => handleMultipleSelectChange(e.target.selectedOptions)}
        >
          {createSelectRanges()}
        </select>
        <p className="text-danger font-weight-bold"> {createInfo} </p>
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
            <div className="modal-body">{createRoomInputs()}</div>
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
                onClick={createNewRoom}
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

export default EditCreateRoomModal;
