import React, { useState } from "react";

import PostInfo from "@components/postInfo";

import { useRegister } from "@hooks/authApi";
import usePostInfoHook from "@hooks/usePostInfoHook";
import RegisterForm from "./RegisterForm";
import { UserRegisterData } from "src/@types/types";
import { registerElementId } from "@src/utils/dataTestIdsList";

function Register() {
  const [registerInitialValues] = useState<UserRegisterData>({
    username: "",
    password: "",
    firstname: "",
    surname: "",
    birthday: new Date(),
    country: "",
    gender: "",
    nickColor: "",
    email: "",
    phone: "",
  });
  const { registerResponse, registerError, register } = useRegister();

  const { postInfo } = usePostInfoHook(registerResponse?.data.message, registerError?.message);

  return (
    <div data-testid={registerElementId}>
      <div className="section-header">
        <h2> Register </h2>
      </div>
      <div className="register-form w-100">
        <RegisterForm initialValues={registerInitialValues} onSubmit={register} />
      </div>
      <PostInfo info={postInfo} />
    </div>
  );
}

export default Register;
