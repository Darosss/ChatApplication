import "./style.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAcciosHook from "../../hooks/useAcciosHook";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [postInfo, setPostInfo] = useState("");

  const { response: loginResponse, sendData: sendLoginData } = useAcciosHook({
    url: `/login`,
    method: "post",
    withCredentials: true,
    data: {
      username: username,
      password: password,
    },
  });

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    sendLoginData();
  };

  useEffect(() => {
    if (loginResponse) setPostInfo(loginResponse?.data.message);
  }, [loginResponse]);

  return (
    <div>
      <div className="section-header">
        <h2>Log in to chat room</h2>
      </div>
      <div className="login-form">
        <form onSubmit={login}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <Button type="submit" className="btn btn-primary">
              Login
            </Button>
          </div>
          <div className="form-group post-info">
            <label> {postInfo}</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
