import React, { useContext, useEffect, useState } from "react";
import ModalCore from "@components/modal";
import { SendDataContext } from "@contexts/SendDataContext";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useEditUser, useGetUsersRooms } from "@hooks/usersApi";
import { useRefetchData } from "@hooks/useAcciosHook";
import EditUserForm from "./EditUserForm";
import PostInfo from "@components/postInfo";

function EditUserModal(props: { user: IUserRes; users: IUserRes[]; ranges: IRangeRes[] }) {
  const { user, ranges, users } = props;
  const { sendData: refetchData } = useContext(SendDataContext);

  const [userValues, setUserValues] = useState<UserUpdateData>({
    username: "",
    firstname: "",
    surname: "",
    country: "",
    birthday: new Date(),
    gender: "",
    nickColor: "",
    email: "",
    phoneNumber: "",
    ranges: [],
  });

  const [userChatRooms, setUserChatRooms] = useState<IChatRoomRes[]>();

  useEffect(() => {
    if (!user) return;
    setUserValues({
      username: user.username,
      firstname: user.firstname,
      surname: user.surname,
      country: user.country,
      birthday: user.birthday,
      gender: user.gender,
      nickColor: user.nickColor,
      email: user.email,
      phoneNumber: user.phoneNumber,
      ranges: user.ranges as string[],
    });
  }, [user]);

  const { userEditResponse, userEditError, userEdit } = useEditUser(user._id);

  const { usersRoomResponse, refetchUsersRooms } = useGetUsersRooms(user._id);

  useEffect(() => {
    setUserChatRooms(usersRoomResponse?.data.chatRooms);
  }, [usersRoomResponse]);

  const { postInfo } = usePostInfoHook(userEditResponse?.data.message, userEditError?.message);

  useRefetchData(userEditResponse, refetchData);

  return (
    <ModalCore
      actionName="Edit user"
      actionBtnVariant="primary"
      postInfo={postInfo}
      onShowFn={() => {
        refetchUsersRooms();
      }}
      form={true}
    >
      <EditUserForm
        initialValues={userValues}
        onSubmit={userEdit<UserUpdateData>}
        rangesList={ranges}
        usersList={users}
        userRoomsList={userChatRooms || []}
      />

      <PostInfo info={postInfo} />
    </ModalCore>
  );
}

export default EditUserModal;
