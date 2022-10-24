import React, { useState } from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import BanUserModal from "./BanUserModal";

function UsersList(props) {
  const [selectedUserId, setSelectedUserId] = useState("");

  const unbanUser = (e) => {
    const axiosConfig = {
      method: "post",
      withCredentials: true,
      url: "http://localhost:5000/users/unban/" + e,
    };
    axios(axiosConfig);
    window.location.reload(false);
  };

  const banButton = (userId) => {
    return (
      <button
        id={userId}
        className="btn btn-danger w-100"
        data-toggle="modal"
        data-target="#ban-user"
        onClick={(e) => setSelectedUserId(e.target.id)}
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
        data-target="#unban-user"
        onClick={(e) => unbanUser(e.target.id)}
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
                    onClick={(e) => setSelectedUserId(e.target.id)}
                  >
                    EDIT
                  </button>
                </td>
                <td>
                  {/* if banned unban if not ban */}
                  {user.isBanned ? unbanButton(user._id) : banButton(user._id)}
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
      <BanUserModal
        id="ban-user"
        sectionName="Ban user"
        userId={selectedUserId}
      />
    </div>
  );
}

export default UsersList;
