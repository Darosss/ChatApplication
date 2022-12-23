import "./style.css";
import "./style.css";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = (e: React.FormEvent) => {
    e.preventDefault();
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/login`,
    }).then(() => {
      window.location.reload();
    });
  };
  return (
    <div>
      <div className="section-header">
        <h2>Log in to chat room</h2>
      </div>
      <div className="login-form">
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
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
