import "./style.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import useAcciosHook from "@hooks/useAcciosHook";
import { Link } from "react-router-dom";
import PostInfo from "@components/postInfo";
import { Formik } from "formik";
import { object, string } from "yup";

interface LoginFields {
  username: string;
  password: string;
}

const logInSchema = object<LoginFields>().shape({
  username: string().required("Required!"),
  password: string().required("Required!"),
});

function Login() {
  const [postInfo, setPostInfo] = useState("");
  const {
    response: loginResponse,
    error: loginError,
    sendData: sendLoginData,
  } = useAcciosHook(
    {
      url: `/login`,
      method: "post",
      withCredentials: true,
    },
    true,
  );

  useEffect(() => {
    if (loginResponse) setPostInfo(loginResponse?.data?.message);
  }, [loginResponse]);

  useEffect(() => {
    if (loginError) setPostInfo(loginError.message);
    console.log(loginError, "kaka");
  }, [loginError]);

  return (
    <div>
      <div className="section-header">
        <h2>Log in to chat room</h2>
      </div>
      <div className="login-form">
        <Formik
          validationSchema={logInSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, actions) => {
            sendLoginData<LoginFields>(values);
            actions.setSubmitting(false);
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group as={Col} className="position-relative mt-5" controlId="validation-username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="position-relative mt-5" controlId="validation-password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  autoComplete="on"
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback tooltip type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className="mt-5">
                <Button type="submit" className="btn btn-primary">
                  Login
                </Button>
                <div>
                  No account? <Link to="/register">register</Link>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </div>
      <PostInfo info={postInfo} />
    </div>
  );
}

export default Login;
