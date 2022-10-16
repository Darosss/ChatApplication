import React from "react";
import { useAuth } from "../auth/useAuth";
import { Button } from "react-bootstrap";
function Logout() {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };
  return (
    <li className="nav-item">
      <Button type="button" onClick={logout} class="btn btn-danger">
        Primary
      </Button>
    </li>
  );
}
export default Logout;
