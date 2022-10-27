import React, { useEffect, useState } from "react";
import ModalCore from "../Modal";
import axios from "axios";

function EditUserModal(props) {
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
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/users/" + props.userId,
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
  }, [props]);

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
      url: "http://localhost:5000/users/edit/" + props.userId,
    };
    axios(axiosEditUser).then((res) => {
      setPostInfo(res.data.message);
    });
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

  const handleMultipleSelectRanges = (options) => {
    const selectedOptions = [...options].map((option) => option.value);
    setUserRanges(selectedOptions);
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

  const setUserDetailsOnChange = (e, setStateFn) => {
    setStateFn(e);
  };

  const modalBody = () => {
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
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Edit user"
      body={modalBody()}
      onClickFn={editUser}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditUserModal;
