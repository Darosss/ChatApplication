import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactSession } from "react-client-session";
function App() {
  const navigate = useNavigate();
  const logout = () => {
    ReactSession.remove("authenticated");
    axios({
      method: "POST",
      withCredentials: true,
      url: "/logout",
    }).then((res) => {
      console.log(res);
      navigate("/login");
    });
  };
  return <button onClick={logout}> LOGOUT </button>;
}
export default App;
