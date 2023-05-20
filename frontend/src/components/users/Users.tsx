import React, { useEffect, useState } from "react";

import UsersList from "./usersList";
import { SendDataContext } from "@contexts/SendDataContext";
import { useGetUsers } from "@hooks/usersApi";
import { IUserRes } from "src/@types/types";

function Users() {
  const { usersResponse, usersLoading, refetchUsers } = useGetUsers();

  const [users, setUsers] = useState<IUserRes[]>([]);

  useEffect(() => {
    console.log(usersResponse?.data.users);
    if (usersResponse) setUsers(usersResponse.data.users);
  }, [usersResponse]);

  return (
    <SendDataContext.Provider value={{ sendData: refetchUsers }}>
      <div data-testid="users-element">
        <div className="section-header">
          <h1> Users list {usersLoading ? " Fetching data..." : null}</h1>
        </div>
        {users ? <UsersList users={users} /> : null}
      </div>
    </SendDataContext.Provider>
  );
}

export default Users;
