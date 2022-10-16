import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
function Logout() {
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    })
      .then((res) => {
        console.log(res, "res");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <li className="nav-item">
      {/* add form */}
      <Button type="button" onClick={logout} className="btn btn-danger">
        Logout
      </Button>
    </li>
  );
}
export default Logout;
