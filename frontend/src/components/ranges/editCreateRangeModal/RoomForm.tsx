import React from "react";
import { Formik } from "formik";
import { rangeSchema } from "./validationSchema";
import { Form, Col, Button } from "react-bootstrap";

interface RangeFormProps {
  initialValues: RangeUpdateData;
  onSubmit: (values: RangeUpdateData) => void;
  actionName: string;
}
function RangeForm(props: RangeFormProps) {
  const { initialValues, onSubmit, actionName } = props;

  return (
    <Formik
      validationSchema={rangeSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form onSubmit={handleSubmit} className="w-100" noValidate>
          <Form.Group as={Col} className="position-relative" controlId="validation-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="m-5">
            <Button type="submit" className="btn btn-primary w-100">
              {actionName}
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default RangeForm;
