import "./style.css";
import React from "react";
import axios from "axios";
import EditUserModal from "../EditUserModal";
import BanUserModal from "../BanUserModal";

function UsersList(props: { users: IUserRes[] }) {
  const unbanUser = (e: string) => {
    const axiosConfig = {
      method: "post",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/users/unban/` + e,
    };
    axios(axiosConfig)
      .then((data) => {
        console.log("data", data);

        setTimeout(() => {
          window.location.reload();
        }, 100);
      })
      .catch((err) => {
        console.log("Couldn't unban user", err);
      });
  };

  return (
    <div>
      <table className="table table-sm table-dark users-list">
        <thead>
          <tr>
            <th colSpan={3}> Users </th>
            <th> Ban date </th>
            <th> Ban expires </th>
            <th> Ban reason </th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => {
            return (
              <tr key={index}>
                <td> {user.username}</td>
                <td>
                  <EditUserModal userId={user._id} />
                </td>
                <td>
                  {user.isBanned ? (
                    <button
                      id={user._id}
                      type="button"
                      className="btn btn-secondary w-100 modal-core-btn"
                      onClick={(e) => unbanUser((e.target as HTMLButtonElement).id)}
                    >
                      Unban user
                    </button>
                  ) : (
                    <BanUserModal userId={user._id} />
                  )}
                </td>
                <td>{user?.isBanned ? user.bannedDate?.toString().replace("T", " ").split(".")[0] : "-"}</td>
                <td>{user.isBanned ? user.banExpiresDate?.toString().replace("T", " ").split(".")[0] : "-"}</td>
                <td> {user.isBanned ? user.banReason : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
