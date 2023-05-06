import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { registerSchema } from "./validationSchema";

interface RegisterFormProps {
  initialValues: UserRegisterData;
  onSubmit: (values: UserRegisterData) => void;
}
function RegisterForm(props: RegisterFormProps) {
  const { initialValues, onSubmit } = props;

  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit} className="w-75" noValidate>
          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col} className="position-relative" controlId="validation-username">
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
            <Form.Group as={Col} className="position-relative" controlId="validation-email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback tooltip type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="position-relative" controlId="validation-password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                autoComplete="on"
                placeholder="Password"
                value={values.password}
                aria-describedby="passwordHelpBlock"
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback tooltip type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Group>
          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col}>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First name"
                value={values.firstname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Surname"
                value={values.surname}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col} className="position-relative" controlId="validation-birthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                placeholder="Birthday"
                value={values.birthday.toISOString().slice(0, 10)}
                onChange={handleChange}
                isValid={touched.birthday && !errors.birthday}
                isInvalid={!!errors.birthday}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback tooltip type="invalid">
                {!errors.birthday ? null : String(errors.birthday || "")}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="position-relative" controlId="validation-phone">
              <Form.Label>PhoneNumber</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                placeholder="PhoneNumber"
                value={values.phone}
                onChange={handleChange}
                isValid={touched.phone && !errors.phone}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback tooltip type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Group>
          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col}>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Country"
                value={values.country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                placeholder="Gender"
                value={values.gender}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Nick color</Form.Label>
              <Form.Control
                type="text"
                name="nickColor"
                placeholder="Nick color"
                value={values.nickColor}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Group>

          <Form.Group as={Col} className="m-5">
            <Button type="submit" className="btn btn-primary w-100">
              Register
            </Button>
            <div>
              Already have an account? <Link to="/login">login</Link> instead
            </div>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
