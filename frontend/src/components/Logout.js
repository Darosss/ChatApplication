import React from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
// import axios from "axios";
// import { ReactSession } from "react-client-session";
function Logout() {
  // console.log("??? please", logout);
  const auth = useAuth();
  console.log(auth);
  // console.log("??? please", auth);
  // const navigate = useNavigate();
  // const logout = () => {
  //   // ReactSession.remove("authenticated");
  //   axios({
  //     method: "POST",
  //     withCredentials: true,
  //     url: "/logout",
  //   }).then((res) => {
  //     // navigate("/");
  //   });
  // };
  const logout = () => {
    auth.logout();
  };
  return <button onClick={logout}> LOGOUT </button>;
}
export default Logout;
