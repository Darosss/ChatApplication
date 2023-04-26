import "./style.css";
import React, { useEffect, useState } from "react";
import ModalCore from "@components/Modal";
import EditCreateRoomModal from "@components/Rooms/EditCreateRoomModal";
import useAcciosHook from "@hooks/useAcciosHook";

function EditUserModal(props: { user: IUserRes; users: IUserRes[]; ranges: IRangeRes[] }) {
  const { user, ranges, users } = props;

  const [username, setUsername] = useState("");
  const [userRanges, setUserRanges] = useState<string[]>([]);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [nickColor, setNickColor] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [userChatRooms, setUserChatRooms] = useState<IChatRoomRes[]>();

  const [postInfo, setPostInfo] = useState("");

  useEffect(() => {
    if (!user) return; //if roomId = undefined is not editing so return
    setUsername(user.username);
    setFirstname(user.firstname as string);
    setSurname(user.surname as string);
    setUserRanges(user.ranges as string[]);
    setCountry(user.country as string);
    setGender(user.gender as string);
    setPhoneNumber(user.phoneNumber as string);
    setNickColor(user.nickColor as string);
    setEmail(user.email as string);

    // setRanges(res.data.ranges);

    // setUserChatRooms(res.data.chatRooms);
  }, [user]);

  const {
    response: userEditResponse,
    error: userEditError,
    sendData: userEdit,
  } = useAcciosHook(
    {
      url: `users/admin/edit/${user._id}`,
      method: "post",
      withCredentials: true,
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
    },
    true,
  );

  const { response: usersRoomResponse } = useAcciosHook({
    url: `users/rooms/${user._id}`,
    method: "get",
    withCredentials: true,
  });

  useEffect(() => {
    setUserChatRooms(usersRoomResponse?.data.chatRooms);
  }, [usersRoomResponse]);

  useEffect(() => {
    setPostInfo(userEditResponse?.data.message);
  }, [userEditResponse]);

  useEffect(() => {
    if (userEditError) setPostInfo(userEditError?.message);
  }, [userEditError]);

  const createSelect = (label: string) => {
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
    return ranges?.map((range, index) => {
      return (
        <option key={index} value={range._id}>
          {range.name}
        </option>
      );
    });
  };

  const handleMultipleSelectRanges = (options: HTMLCollectionOf<HTMLOptionElement>) => {
    const selectedOptions = [...options].map((option) => option.value);
    setUserRanges(selectedOptions);
  };

  const userDetailsInput = (label: string, value: string, setStateFn: React.Dispatch<React.SetStateAction<string>>) => {
    return (
      <div>
        <label className="form-label ">{label}</label>
        <input type="text" className="form-control" value={value || ""} onChange={(e) => setStateFn(e.target.value)} />
      </div>
    );
  };

  const userChatRoomsList = () => {
    return (
      <>
        <p className="text-center display-6"> User chat rooms </p>
        {userChatRooms?.map((room, index) => {
          return (
            <div key={index}>
              <div className="d-flex bg-secondary m-1">
                <span className="edit-user-room-name">{room.name}</span>
                <EditCreateRoomModal sectionName="Edit" room={room} ranges={ranges} users={users} />
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const modalBody = () => {
    return (
      <div>
        {userDetailsInput("Username", username, setUsername)}
        {userDetailsInput("Firstname", firstname, setFirstname)}
        {userDetailsInput("Surname", surname, setSurname)}
        {userDetailsInput("Email", email, setEmail)}
        {userDetailsInput("Phone", phoneNumber, setPhoneNumber)}
        {userDetailsInput("Nick Color", nickColor, setNickColor)}
        {userDetailsInput("Gender", gender, setGender)}
        {userDetailsInput("Country", country, setCountry)}
        {createSelect("Available ranges")}
        {userChatRoomsList()}
      </div>
    );
  };

  return (
    <ModalCore
      actionName="Edit user"
      body={modalBody()}
      onClickFn={userEdit}
      actionBtnVariant="primary"
      postInfo={postInfo}
    />
  );
}

export default EditUserModal;
