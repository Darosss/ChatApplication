import React, { useState } from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
// import EditCreateRoomModal from "./EditCreateRoomModal";
// import DeleteRoomModal from "./DeleteRoomModal";

function UsersList(props) {
  const [selectedUser, setSelectedUser] = useState([]);
  const [availableRanges, setAvailableRanges] = useState([]);

  const showUser = (e) => {
    const buttonId = e.target.id;
    const axiosConfigRoom = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/users/" + buttonId,
    };
    axios(axiosConfigRoom).then((res) => {
      setSelectedUser(res.data.user);
      setAvailableRanges(res.data.ranges);
    });
  };

  //   const getBanUser = (e) => {
  //     const buttonId = e.target.id;
  //     const axiosConfigRoom = {
  //       method: "get",
  //       withCredentials: true,
  //       url: "http://localhost:5000/rooms/delete/" + buttonId,
  //     };
  //     axios(axiosConfigRoom).then((res) => {
  //       console.log(res, "delete");
  //       setSelectedUser(res.data.chatRoomDelete);
  //     });
  //   };
  const banButton = (userId) => {
    return (
      <button
        id={userId}
        className="btn btn-danger w-100"
        data-toggle="modal"
        data-target="#remove-user"
      >
        BAN
      </button>
    );
  };
  const unbanButton = (userId) => {
    return (
      <button
        id={userId}
        className="btn btn-secondary w-100"
        data-toggle="modal"
        data-target="#remove-user"
      >
        UNBAN
      </button>
    );
  };
  return (
    <div className="container d-flex justify-content-center">
      <table className="table table-sm table-dark w-50">
        <thead>
          <tr>
            <th colSpan={3}> Users </th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => {
            return (
              <tr key={index}>
                <td> {user.username}</td>
                <td>
                  <button
                    id={user._id}
                    className="btn btn-primary w-100"
                    data-toggle="modal"
                    data-target="#edit-user"
                    onClick={showUser}
                  >
                    EDIT
                  </button>
                </td>
                <td>
                  {/* if banned unban if not ban */}
                  {user.isBanned ? banButton(user._id) : unbanButton(user._id)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditUserModal
        id="edit-user"
        sectionName="Edit user"
        postSuffix={selectedUser._id}
        user={selectedUser}
        availableRanges={availableRanges}
      />
    </div>
  );
}

export default UsersList;
