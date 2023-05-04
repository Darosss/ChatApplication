import React from "react";

import UsersList from "./usersList";
import useAcciosHook from "@hooks/useAcciosHook";
import { SendDataContext } from "@contexts/SendDataContext";

function Users() {
  const {
    response: usersRes,
    loading: loadingUsers,
    sendData: refetchUsers,
  } = useAcciosHook<{ users: IUserRes[] }>({
    url: `/users`,
    method: "get",
    withCredentials: true,
  });
  const users = usersRes?.data.users;

  return (
    <SendDataContext.Provider value={{ sendData: refetchUsers }}>
      <div>
        <div className="section-header">
          <h1> Users list {loadingUsers ? " Fetching data..." : null}</h1>
        </div>
        {users ? <UsersList users={users} /> : null}
      </div>
    </SendDataContext.Provider>
  );
}

export default Users;
