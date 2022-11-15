import React from "react";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import BanUserModal from "./BanUserModal";

function UsersList(props) {
  const unbanUser = (e) => {
    const axiosConfig = {
      method: "post",
      withCredentials: true,
      url: "/api/v1/users/unban/" + e,
    };
    axios(axiosConfig);
    window.location.reload(false);
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
                  <EditUserModal userId={user._id} username={user.username} />
                </td>
                <td>
                  {user.isBanned ? (
                    <button
                      id={user._id}
                      className="btn btn-secondary w-100"
                      onClick={(e) => unbanUser(e.target.id)}
                    >
                      Unban
                    </button>
                  ) : (
                    <BanUserModal userId={user._id} username={user.username} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
