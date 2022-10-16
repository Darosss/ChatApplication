import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
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
    <div className="App">
      <header className="App-header">
        <h2>Log in to chat room</h2>

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
            <Button type="submit" className="btn btn-primary">
              {" "}
              Login{" "}
            </Button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Login;
