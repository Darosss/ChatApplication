import React from "react";
import axios from "axios";
function Logout() {
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/logout`,
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
    <li className="">
      <button onClick={logout} className="nav-li-button btn btn-danger w-100">
        Logout
      </button>
    </li>
  );
}
export default Logout;
