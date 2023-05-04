import React from "react";
import { Link } from "react-router-dom";
import PostInfo from "@components/postInfo";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { object, string, date, number } from "yup";
import { useRegister } from "@hooks/authApi";
import usePostInfoHook from "@hooks/usePostInfoHook";

interface RegisterFields {
  username: string;
  password: string;
  firstname: string;
  surname: string;
  birthday: string;
  country: string;
  gender: string;
  nickColor: string;
  email: string;
  phone: string;
}

const registerSchema = object<RegisterFields>().shape({
  username: string().required("Required!"),
  password: string()
    .required("Required!")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{4,}$/,
      "Password must contain at least: 1 upper case, 1 lower case, 1 symbol, 1 number.",
    ),
  email: string().required("Required!"),
  birthday: date()
    .default(() => new Date())
    .required("Required!"),
  phone: number().required("Required!"),
});

function Register() {
  const { registerResponse, registerError, register } = useRegister();
  const { postInfo } = usePostInfoHook(registerResponse?.data.message, registerError?.message);

  return (
    <div>
      <div className="section-header">
        <h2> Register </h2>
      </div>
      <div className="register-form w-100">
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            username: "",
            password: "",
            firstname: "",
            surname: "",
            birthday: new Date().toISOString().slice(0, 10),
            country: "",
            gender: "",
            nickColor: "",
            email: "",
            phone: "",
          }}
          onSubmit={(values, actions) => {
            register(values);
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
                    value={values.birthday.toString()}
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
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    placeholder="Phone"
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
      </div>
      <PostInfo info={postInfo} />
    </div>
  );
}

export default Register;
