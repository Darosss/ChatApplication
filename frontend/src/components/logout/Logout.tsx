import React, { useEffect, useContext } from "react";
import { useLogout } from "@hooks/authApi";
import { AuthContext } from "@contexts/authContext";

function Logout() {
  const { setAuth } = useContext(AuthContext);
  const { logoutResponse, logout } = useLogout();

  const handleOnClickLogout = () => {
    logout();
  };

  useEffect(() => {
    if (logoutResponse) setAuth(null);
  }, [logoutResponse, setAuth]);

  return (
    <li>
      <button onClick={handleOnClickLogout} className="nav-li-button btn btn-danger w-100">
        Logout
      </button>
    </li>
  );
}
export default Logout;
