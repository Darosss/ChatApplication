import React, { useEffect, useContext } from "react";
import { useLogout } from "@hooks/authApi";
import { AuthContext } from "@contexts/authContext";
import { logoutElementId } from "@utils/dataTestIdsList";

function Logout() {
  const { removeAuth } = useContext(AuthContext);
  const { logoutResponse, logout } = useLogout();

  const handleOnClickLogout = () => {
    logout();
  };

  useEffect(() => {
    if (logoutResponse) removeAuth();
  }, [logoutResponse, removeAuth]);

  return (
    <li>
      <button
        data-testid={logoutElementId}
        onClick={handleOnClickLogout}
        className="nav-li-button btn btn-danger w-100"
      >
        Logout
      </button>
    </li>
  );
}
export default Logout;
