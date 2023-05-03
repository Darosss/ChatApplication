import React from "react";
import EditUserModal from "../editUserModal";
import BanUserModal from "../banUserModal";
import UnbanUserModal from "../unbanUserModal";
import useAcciosHook from "@hooks/useAcciosHook";

function UsersList(props: { users: IUserRes[] }) {
  const { users } = props;
  const { response: rangesRes } = useAcciosHook({
    url: `/ranges`,
    method: "get",
    withCredentials: true,
  });

  const ranges = rangesRes?.data.ranges as IRangeRes[];

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
          {users?.map((user, index) => {
            return (
              <tr key={index}>
                <td> {user.username}</td>
                <td>
                  <EditUserModal user={user} ranges={ranges} users={users} />
                </td>
                <td>
                  {user.isBanned ? (
                    <UnbanUserModal userId={user._id} username={user.username} />
                  ) : (
                    <BanUserModal userId={user._id} username={user.username} />
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
