import React, { useEffect, useState } from "react";
import axios from "axios";

function EditProfileModal(props) {
  console.log("editproile", props);
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
        phone: phone,
        gender: gender,
        nickColor: nickColor,
      },
      withCredentials: true,
      url: "http://localhost:5000/profil/" + props.user._id,
    };
    axios(axiosEditProfile).then((res) => {
      console.log(res, "kek");
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  const createModalBody = () => {
    return (
      <div>
        {createProfileInputs()}
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
        aria-labelledby="editProfileLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileLabel">
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
                onClick={editProfile}
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const createProfileInputs = () => {
    return (
      <div>
        <label className="form-label">Old password / New password</label>
        <div className="input-group">
          <input
            name="oldPassword"
            type="password"
            className="form-control"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <label className="form-label">Firstname and surname</label>
        <div className="input-group">
          <input
            name="firstname"
            value={firstname || ""}
            type="text"
            className="form-control"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            name="surname"
            value={surname || ""}
            type="text"
            className="form-control"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <label className="form-label">Email</label>
        <input
          name="email"
          type="text"
          className="form-control"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label">Birthday</label>
        <input
          name="birthday"
          type="date"
          value={birthday ? birthday.split("T")[0] : ""}
          className="form-control"
          onChange={(e) => setBirthday(e.target.value)}
        />

        <label className="form-label">Country</label>
        <input
          name="country"
          type="text"
          value={country || ""}
          className="form-control"
          onChange={(e) => setCountry(e.target.value)}
        />

        <label className="form-label">Gender</label>
        <input
          name="gender"
          type="text"
          value={gender || ""}
          className="form-control"
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="form-label">Phone</label>
        <input
          name="phone"
          type="text"
          value={phone || ""}
          className="form-control"
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="form-label">Nick color</label>
        <input
          name="nickColor"
          value={nickColor || ""}
          type="text"
          className="form-control"
          onChange={(e) => setNickColor(e.target.value)}
        />
      </div>
    );
  };

  return createModal();
}

export default EditProfileModal;
