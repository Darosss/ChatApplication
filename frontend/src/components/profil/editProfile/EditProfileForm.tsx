import React from "react";
import { Formik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import { editProfileSchema } from "./validationSchema";

interface EditProfileFormProps {
  initialValues: LoggedUserUpdateData;
  onSubmit: (values: LoggedUserUpdateData) => void;
}

function EditProfileForm(props: EditProfileFormProps) {
  const { initialValues, onSubmit } = props;
  return (
    <Formik
      validationSchema={editProfileSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit} className="w-75" noValidate>
          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col} controlId="validation-oldPassword">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                name="oldPassword"
                type="password"
                autoComplete="current-password"
                value={values.oldPassword}
                onChange={handleChange}
                isValid={touched.oldPassword && !errors.oldPassword}
                isInvalid={!!errors.oldPassword}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="validation-newPassword">
              <Form.Label>New password</Form.Label>
              <Form.Control
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={values.newPassword}
                onChange={handleChange}
                isValid={touched.newPassword && !errors.newPassword}
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
            </Form.Group>
          </Form.Group>
          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col}>
              <Form.Label>Firstname</Form.Label>
              <Form.Control name="firstname" type="text" value={values.firstname} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Surname</Form.Label>
              <Form.Control name="surname" type="text" value={values.surname} onChange={handleChange} />
            </Form.Group>
          </Form.Group>

          <Form.Group as={Col} controlId="validation-email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="validation-birthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              name="birthday"
              type="date"
              value={values.birthday.toString().slice(0, 10)}
              onChange={handleChange}
              isValid={touched.birthday && !errors.birthday}
              isInvalid={!!errors.birthday}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {!errors.birthday ? null : String(errors.birthday || "")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row} className="mt-5">
            <Form.Group as={Col}>
              <Form.Label>Country</Form.Label>
              <Form.Control name="country" type="text" value={values.country} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Gender</Form.Label>
              <Form.Control name="gender" type="text" value={values.gender} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Nick color</Form.Label>
              <Form.Control name="nickColor" type="text" value={values.nickColor} onChange={handleChange} />
            </Form.Group>
          </Form.Group>

          <Form.Group as={Col} controlId="validation-phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              type="text"
              value={values.phone}
              onChange={handleChange}
              isValid={touched.phone && !errors.phone}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="m-5">
            <Button type="submit" className="btn btn-primary w-100">
              Edit
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfileForm;
