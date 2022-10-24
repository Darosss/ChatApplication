import React, { useState } from "react";
import EditUserModal from "./EditUserModal";

function UsersList(props) {
  const [selectedUserId, setSelectedUserId] = useState("");

  const showUser = (e) => {
    const buttonId = e.target.id;
    setSelectedUserId(buttonId);
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
        userId={selectedUserId}
      />
    </div>
  );
}

export default UsersList;
