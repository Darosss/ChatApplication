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

  return (
    <li>
      <button onClick={logout} className="nav-li-button btn btn-danger w-100">
        Logout
      </button>
    </li>
  );
}
export default Logout;
