import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersList from "./UsersList";

function Users() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/users/`,
    };
    axios(axiosConfig).then((res) => {
      setUsersList(res.data.usersList);
    });
  }, []);
  return (
    <div>
      <div class="section-header">
        <h1> Users list </h1>{" "}
      </div>
      <UsersList users={usersList} />
    </div>
  );
}

export default Users;
