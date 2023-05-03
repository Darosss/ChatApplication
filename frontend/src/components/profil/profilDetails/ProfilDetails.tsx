import React from "react";
import "./style.css";

import EditProfile from "../editProfile";
function ProfilDetails(props: { user: IUserRes }) {
  const { user } = props;
  return (
    <div>
      <table className="table table-sm table-dark profil-details">
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
            <td>{user.birthday ? user.birthday.toString().split("T")[0] : null}</td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>{user.createdAt ? user.createdAt.toString().replace("T", " ").replace("Z", "") : null}</td>
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
              <td>{user.bannedDate?.toString()}</td>
            </tr>
          ) : null}
          {user.isBanned ? (
            <tr>
              <td>Banned expires</td>
              <td>{user.banExpiresDate?.toString()}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default ProfilDetails;
