import React, { useContext, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostInfo from "@components/postInfo";
import { Formik } from "formik";
import { object, string } from "yup";
import usePostInfoHook from "@hooks/usePostInfoHook";
import { useLogin } from "@hooks/authApi";
import { SendDataContext } from "@contexts/SendDataContext";

interface LoginFields {
  username: string;
  password: string;
}

const logInSchema = object<LoginFields>().shape({
  username: string().required("Required!"),
  password: string().required("Required!"),
});

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
        <Formik
          validationSchema={logInSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, actions) => {
            login<LoginFields>(values);
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
