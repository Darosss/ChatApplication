import React, { useState } from "react";
import axios from "axios";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => {
      console.log(res);
      window.location.reload(false);
    });
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
    </div>
  );
}

export default Login;
