import React, { useEffect, useState } from "react";
import axios from "axios";
function EditCreateRoomModal(props) {
  const [postInfo, setPostInfo] = useState("");
  // useEffect(() => {
  //   if (props.editedRoom) {
  //     setRoomName(props.editedRoom.name);
  //     setRoomRanges(props.editedRoom.availableRanges);
  //     setRoomBannedUsers(props.editedRoom.bannedUsers);
  //     setRoomAllowedUsers(props.editedRoom.allowedUsers);
  //   }
  // }, [props]);

  const editProfile = () => {
    const axiosEditProfile = {
      method: "post",
      data: {
        username: "test",
      },
      withCredentials: true,
      url: "http://localhost:5000/profile/",
    };
    axios(axiosEditProfile).then((res) => {
      setPostInfo(res.data.message);
    });
    window.location.reload(false);
  };

  return "";
}

export default EditCreateRoomModal;
