import React from "react";
import axios from "axios";
function Logout() {
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "/api/v1/logout",
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
      <button onClick={logout} className="btn btn-danger w-100">
        Logout
      </button>
    </li>
  );
}
export default Logout;
