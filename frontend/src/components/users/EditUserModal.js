import React, { useEffect, useState } from "react";
import axios from "axios";
function EditUserModal(props) {
  const [userDetails, setUserDetails] = useState({});
  const [postInfo, setPostInfo] = useState("");
  useEffect(() => {
    setUserDetails(props.user);
  }, [props]);

  const createSelect = (label) => {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select
          className="form-select bg-dark text-light"
          id="user-ranges"
          multiple
          value={userDetails.ranges}
          aria-label={"multiple select " + label}
          onChange={(e) => handleMultipleSelectRanges(e.target.selectedOptions)}
        >
          {createSelectRangesOptions()}
        </select>
      </div>
    );
  };

  const editUser = () => {
    const axiosEditUser = {
      method: "post",
      data: {
        userDetails: userDetails,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/edit/" + props.postSuffix,
    };
    axios(axiosEditUser).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const setUserDetailsOnChange = (e) => {
    const { name, value } = e;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const createSelectRangesOptions = () => {
    return props.availableRanges.map((range, index) => {
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };

  /* FIXME remove repeat */
  const handleMultipleSelectRanges = (options) => {
    const selectedOptions = [...options].map((option) => option.value);

    setUserDetails((prevState) => ({
      ...prevState,
      ["ranges"]: selectedOptions,
    }));
  };

  /* FIXME Repeat */
  const userDetailsInput = (label, name, value, type = "text") => {
    return (
      <div>
        <label className="form-label ">{label}</label>
        <input
          name={name}
          type={type}
          className="form-control"
          value={value || ""}
          onChange={(e) => setUserDetailsOnChange(e.target)}
        />
      </div>
    );
  };

  const createModalBody = () => {
    return (
      <div>
        {userDetailsInput("Username", "username", userDetails.username)}
        {userDetailsInput("Firstname", "firstname", userDetails.firstname)}
        {userDetailsInput("Surname", "surname", userDetails.surname)}
        {userDetailsInput("Email", "email", userDetails.email)}
        {userDetailsInput("Phone", "phoneNumber", userDetails.phoneNumber)}
        {userDetailsInput("Nick Color", "nickColor", userDetails.nickColor)}
        {createSelect("Available ranges")}

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
                onClick={editUser}
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

export default EditUserModal;
