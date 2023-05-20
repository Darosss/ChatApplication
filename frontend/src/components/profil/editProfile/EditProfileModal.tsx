import React, { useContext, useEffect, useState } from "react";
import ModalCore from "@components/modal";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { SendDataContext } from "@contexts/SendDataContext";
import { useProfilEdit } from "@hooks/profilApi";
import { useRefetchData } from "@hooks/useAcciosHook";
import EditProfileForm from "./EditProfileForm";
import PostInfo from "@components/postInfo";
import { IUserRes, LoggedUserUpdateData } from "src/@types/types";

function EditProfileModal(props: { user: IUserRes }) {
  const { user } = props;

  const { sendData: refetchData } = useContext(SendDataContext);

  const [profilValues, setProfilValues] = useState<LoggedUserUpdateData>({
    oldPassword: "",
    newPassword: "",
    firstname: "",
    surname: "",
    birthday: new Date(),
    country: "",
    gender: "",
    nickColor: "",
    email: "",
    phone: "",
  });

  const { profilEditResponse, profilEditError, profilEdit } = useProfilEdit();

  useEffect(() => {
    setProfilValues({
      oldPassword: "",
      newPassword: "",
      firstname: user.firstname || "",
      surname: user.surname || "",
      birthday: user.birthday,
      country: user.country || "",
      gender: user.gender || "",
      nickColor: user.nickColor || "",
      email: user.email,
      phone: user.phone || "",
    });
  }, [user]);

  const { postInfo } = usePostInfoHook(profilEditResponse?.data.message, profilEditError?.message);

  useRefetchData(profilEditResponse, refetchData);

  return (
    <ModalCore actionName="Edit" actionBtnVariant="primary" postInfo={postInfo} form={true}>
      <div className="d-flex justify-content-center">
        <EditProfileForm initialValues={profilValues} onSubmit={profilEdit<LoggedUserUpdateData>} />
      </div>

      <PostInfo info={postInfo} />
    </ModalCore>
  );
}

export default EditProfileModal;
