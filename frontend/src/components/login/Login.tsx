import React, { useContext, useEffect } from "react";
import PostInfo from "@components/postInfo";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useLogin } from "@hooks/authApi";
import { SendDataContext } from "@contexts/SendDataContext";
import LoginForm from "./LoginForm";

function Login() {
  const { sendData: refetchSession } = useContext(SendDataContext);
  const { loginResponse, loginError, login } = useLogin();
  const { postInfo } = usePostInfoHook(loginResponse?.data.message, loginError?.message);

  useEffect(() => {
    if (loginResponse) refetchSession();
  }, [loginResponse, refetchSession]);

  return (
    <div>
      <div className="section-header">
        <h2>Log in to chat room</h2>
      </div>
      <div className="login-form">
        <LoginForm onSubmit={login<LoginFields>} />
      </div>
      <PostInfo info={postInfo} />
    </div>
  );
}

export default Login;
