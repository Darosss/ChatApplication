import React, { useContext, useEffect, useState } from "react";
import ModalCore from "@components/modal";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { SendDataContext } from "@contexts/SendDataContext";
import { useProfilEdit } from "@hooks/profilApi";

function EditProfileModal(props: { user: IUserRes }) {
  const { user } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nickColor, setNickColor] = useState("");

  const { profilEditResponse, profilEditError, profilEdit } = useProfilEdit({
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
  });

  useEffect(() => {
    setFirstname(user.firstname as string);
    setSurname(user.surname as string);
    setEmail(user.email as string);
    setBirthday(user.birthday);
    setCountry(user.country as string);
    setPhone(user.phoneNumber as string);
    setGender(user.gender as string);
    setNickColor(user.nickColor as string);
  }, [user]);

  const { postInfo } = usePostInfoHook(profilEditResponse?.data.message, profilEditError?.message);

  const handleOnClickEditProfile = () => {
    profilEdit().then(() => {
      refetchData();
    });
  };

  const createProfileInput = (name: string, onChangeFn: (value: any) => void, value = "", type = "text") => {
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
  const createTwoInputGroup = (labelName: string, firstInput: JSX.Element, secondInput: JSX.Element) => {
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
          createProfileInput("oldPassword", setOldPassword, oldPassword, "password"),
          createProfileInput("newPassword", setNewPassword, newPassword, "password"),
        )}
        {createTwoInputGroup(
          "Firstname / Surname",
          createProfileInput("firstname", setFirstname, firstname),
          createProfileInput("surname", setSurname, surname),
        )}

        <label className="form-label">Email</label>
        {createProfileInput("email", setEmail, email)}
        <label className="form-label">Birthday</label>
        {createProfileInput("birthday", setBirthday, birthday ? birthday?.toString().split("T")[0] : "", "date")}
        <label className="form-label">Country</label>
        {createProfileInput("country", setCountry, country)}
        <label className="form-label">Gender</label>
        {createProfileInput("gender", setGender, gender)}
        <label className="form-label">Phone</label>
        {createProfileInput("phone", setPhone, phone)}
        <label className="form-label">Nick color</label>
        {createProfileInput("nickColor", setNickColor, nickColor)}
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Edit"
      onClickFn={handleOnClickEditProfile}
      actionBtnVariant="primary"
      postInfo={postInfo}
      closeOnSubmit={true}
    >
      {modalBody()}
    </ModalCore>
  );
}

export default EditProfileModal;
