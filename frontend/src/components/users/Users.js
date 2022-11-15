import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersList from "./UsersList";

function Users() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "/api/v1/users/",
    };
    axios(axiosConfig).then((res) => {
      setUsersList(res.data.usersList);
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <UsersList users={usersList} />
      </header>
    </div>
  );
}

export default Users;
