import React, { useEffect, useState } from "react";
import axios from "axios";

function EditUserModal(props) {
  const [userId, setUserId] = useState("");

  const [username, setUsername] = useState("");
  const [userRanges, setUserRanges] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [nickColor, setNickColor] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [ranges, setRanges] = useState([]);

  const [postInfo, setPostInfo] = useState("");
  useEffect(() => {
    if (!props.userId) return;
    setUserId(props.userId);
  }, [props]);

  useEffect(() => {
    if (!userId) return;

    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/users/" + userId,
    };

    axios(axiosConfig).then((res) => {
      const userDetails = res.data.user;
      setUsername(userDetails.username);
      setFirstname(userDetails.firstname);
      setSurname(userDetails.surname);
      setUserRanges(userDetails.ranges);
      setCountry(userDetails.country);
      setGender(userDetails.gender);
      setPhoneNumber(userDetails.phoneNumber);
      setNickColor(userDetails.nickColor);
      setEmail(userDetails.email);

      setRanges(res.data.ranges);
    });
  }, [userId]);

  const editUser = () => {
    const axiosEditUser = {
      method: "post",
      data: {
        username: username,
        firstname: firstname,
        surname: surname,
        country: country,
        gender: gender,
        nickColor: nickColor,
        email: email,
        phoneNumber: phoneNumber,
        ranges: userRanges,
      },
      withCredentials: true,
      url: "http://localhost:5000/users/edit/" + userId,
    };
    axios(axiosEditUser).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const createSelect = (label) => {
    return (
      <div>
        <label className="form-label">{label}</label>
        <select
          className="form-select bg-dark text-light"
          id="user-ranges"
          multiple
          value={userRanges}
          aria-label={"multiple select " + label}
          onChange={(e) => handleMultipleSelectRanges(e.target.selectedOptions)}
        >
          {createSelectRangesOptions()}
        </select>
      </div>
    );
  };

  const createSelectRangesOptions = () => {
    return ranges.map((range, index) => {
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
    setUserRanges(selectedOptions);
  };

  /* FIXME Repeat */

  const setUserDetailsOnChange = (e, setStateFn) => {
    setStateFn(e);
  };

  const userDetailsInput = (label, value, setStateFn) => {
    return (
      <div>
        <label className="form-label ">{label}</label>
        <input
          type="text"
          className="form-control"
          value={value || ""}
          onChange={(e) => setUserDetailsOnChange(e.target.value, setStateFn)}
        />
      </div>
    );
  };
  const createModalBody = () => {
    return (
      <div>
        {userDetailsInput("Username", username, setUsername)}
        {userDetailsInput("Firstname", firstname, setFirstname)}
        {userDetailsInput("Surname", surname, setUsername)}
        {userDetailsInput("Email", email, setEmail)}
        {userDetailsInput("Phone", phoneNumber, setPhoneNumber)}
        {userDetailsInput("Nick Color", nickColor, setNickColor)}
        {userDetailsInput("Gender", gender, setGender)}
        {userDetailsInput("Country", country, setCountry)}
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
