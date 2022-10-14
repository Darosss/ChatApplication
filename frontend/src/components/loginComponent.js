import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactSession } from "react-client-session";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    console.log(ReactSession.get("username"));
    axios({
      method: "GET",
      withCredentials: false,
      url: "/login",
    }).then((res) => console.log(res.data));
  }, []);
  const login = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => ReactSession.set("username", res.data.username));
  };
  return (
    <div>
      <h2>Login to chat room</h2>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login"></input>
        </div>
      </form>
      {/* {userDetails ? <h1> {userDetails.username}</h1> : null} */}
      {ReactSession.get("username") ? (
        <h1> {ReactSession.get("username")}</h1>
      ) : null}
    </div>
  );
}

export default App;
