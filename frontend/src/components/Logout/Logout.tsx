import React from "react";
import "./style.css";
import axios from "axios";

function Logout() {
  const logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/logout`,
    })
      .then((res) => {
        console.log(res, "res");
        window.location.reload();
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
