import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalCore from "../Modal";

function EditProfileModal(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nickColor, setNickColor] = useState("");
  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    setFirstname(props.user.firstname);
    setSurname(props.user.surname);
    setEmail(props.user.email);
    setBirthday(props.user.birthday);
    setCountry(props.user.country);
    setPhone(props.user.phoneNumber);
    setGender(props.user.gender);
    setNickColor(props.user.nickColor);
  }, [props]);

  const editProfile = () => {
    const axiosEditProfile = {
      method: "post",
      data: {
        oldPassword: oldPassword,
        newPassword: newPassword,
        firstname: firstname,
        surname: surname,
        email: email,
        birthday: birthday,
        country: country,
        phoneNumber: phone,
        gender: gender,
        nickColor: nickColor,
      },
      withCredentials: true,
      url: "http://localhost:5000/profil/" + props.user._id,
    };
    axios(axiosEditProfile).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const createProfileInput = (name, onChangeFn, value = "", type = "text") => {
    return (
      <input
        name={name}
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => onChangeFn(e.target.value)}
      />
    );
  };
  const createTwoInputGroup = (labelName, firstInput, secondInput) => {
    return (
      <>
        <label className="form-label">{labelName}</label>
        <div className="input-group">
          {firstInput}
          {secondInput}
        </div>
      </>
    );
  };

  const modalBody = () => {
    return (
      <div>
        {createTwoInputGroup(
          "Old password / New password",
          createProfileInput("oldPassword", setOldPassword, "", "password"),
          createProfileInput("newPassword", setNewPassword, "", "password")
        )}
        {createTwoInputGroup(
          "Firstname / Surname",
          createProfileInput("firstname", setFirstname, firstname),
          createProfileInput("surname", setSurname, surname)
        )}

        <label className="form-label">Email</label>
        {createProfileInput("email", setEmail, email)}
        <label className="form-label">Birthday</label>
        {createProfileInput("birthday", setBirthday, birthday)}
        <label className="form-label">Country</label>
        {createProfileInput("country", setCountry, country)}
        <label className="form-label">Gender</label>
        {createProfileInput("gender", setGender, gender)}
        <label className="form-label">Phone</label>
        {createProfileInput("phone", setPhone, phone)}
        <label className="form-label">Nick color</label>
        {createProfileInput("nickColor", setGender, nickColor)}
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Edit"
      body={modalBody()}
      onClickFn={editProfile}
      actionBtnVariant="danger"
      postInfo={postInfo}
    />
  );
}

export default EditProfileModal;
