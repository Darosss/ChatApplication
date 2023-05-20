import React from "react";

import { Link } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import { logInSchema } from "./validationSchema";
import { LoginFields } from "@src/@types/types";
import { loginFormIds } from "@utils/dataTestIdsList";
interface LoginFormProps {
  onSubmit: (values: LoginFields) => void;
}
function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;

  return (
    <Formik
      validationSchema={logInSchema}
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form data-testid={loginFormIds.form} onSubmit={handleSubmit} noValidate>
          <Form.Group as={Col} className="position-relative mt-5" controlId="validation-username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              data-testid={loginFormIds.usernameInput}
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
              data-testid={loginFormIds.passwordInput}
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
  );
}

export default LoginForm;
