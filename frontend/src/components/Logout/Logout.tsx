import React from "react";
import "./style.css";
import useAcciosHook from "@hooks/useAcciosHook";

function Logout() {
  const { sendData: logout } = useAcciosHook(
    {
      url: `/logout`,
      method: "post",
      withCredentials: true,
    },
    true,
  );

  const handleOnClickLogout = () => {
    logout();
  };
  return (
    <li>
      <button onClick={handleOnClickLogout} className="nav-li-button btn btn-danger w-100">
        Logout
      </button>
    </li>
  );
}
export default Logout;
