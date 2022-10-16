import React from "react";

function ProfilDetails({ user }) {
  return (
    <table className="table table-sm table-dark w-50">
      <tbody>
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
          <td>{user.birthday}</td>
        </tr>
        <tr>
          <td>Created at</td>
          <td>{user.createdAt}</td>
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
  );
}

export default ProfilDetails;
