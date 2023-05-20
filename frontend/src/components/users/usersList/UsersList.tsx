import React, { useEffect, useState } from "react";
import EditUserModal from "../editUserModal";
import BanUserModal from "../banUserModal";
import UnbanUserModal from "../unbanUserModal";
import { useGetRanges } from "@hooks/rangesApi";
import { IUserRes, IRangeRes } from "src/@types/types";
import { getFormatedDate } from "@src/utils/dates";

function UsersList(props: { users: IUserRes[] }) {
  const { users } = props;
  const [ranges, setRanges] = useState<IRangeRes[]>([]);
  const { rangesResponse } = useGetRanges();

  useEffect(() => {
    if (rangesResponse) setRanges(rangesResponse.data.ranges);
  }, [rangesResponse]);

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
                {user.isBanned ? (
                  <>
                    <td>{user.bannedDate ? getFormatedDate(user.bannedDate) : "-"}</td>
                    <td>{user.banExpiresDate ? getFormatedDate(user.banExpiresDate) : "-"}</td>
                    <td> {user.banReason}</td>
                  </>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
