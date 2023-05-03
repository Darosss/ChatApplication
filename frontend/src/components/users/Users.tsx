import React from "react";

import UsersList from "./usersList";
import useAcciosHook from "@hooks/useAcciosHook";

function Users() {
  const { response: usersRes, loading: loadingUsers } = useAcciosHook({
    url: `/users`,
    method: "get",
    withCredentials: true,
  });

  const users = usersRes?.data.users as IUserRes[];

  return (
    <div>
      <div className="section-header">
        <h1> Users list {loadingUsers ? " --Fetching data..." : null}</h1>
      </div>
      <UsersList users={users} />
    </div>
  );
}

export default Users;
