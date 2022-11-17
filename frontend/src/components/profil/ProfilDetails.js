import React from "react";

import EditProfile from "./EditProfile";
function ProfilDetails({ user }) {
  return (
    <div className="container d-flex justify-content-center">
      <table className="table table-sm table-dark w-100">
        <tbody>
          <tr>
            <th>Your profile: {user.username}</th>
            <th>
              <EditProfile user={user} />
            </th>
          </tr>
          <tr>
            <td>Username</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Firstname</td>
            <td>{user.firstname}</td>
          </tr>
          <tr>
            <td>Surname</td>
            <td>{user.surname}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Birthday</td>
            <td>{user.birthday ? user.birthday.split("T")[0] : null}</td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>
              {user.createdAt
                ? user.createdAt.replace("T", " ").replace("Z", "")
                : null}
            </td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{user.country}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phoneNumber}</td>
          </tr>
          <tr>
            <td>Nick color</td>
            <td>{user.nickColor}</td>
          </tr>
          {user.isBanned ? (
            <tr>
              <td>Banned date</td>
              <td>{user.bannedDate}</td>
            </tr>
          ) : null}
          {user.isBanned ? (
            <tr>
              <td>Banned expires</td>
              <td>{user.banExpiresDate}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default ProfilDetails;
