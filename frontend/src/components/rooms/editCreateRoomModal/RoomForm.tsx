import React from "react";
import { Formik } from "formik";
import { roomSchema } from "./validationSchema";
import { Form, Col, Button } from "react-bootstrap";

interface RoomFormProps {
  initialValues: RoomUpdateData;
  onSubmit: (values: RoomUpdateData) => void;
  rangesList: IRangeRes[];
  usersList: IUserRes[];
  actionName: string;
}
function RoomForm(props: RoomFormProps) {
  const { initialValues, onSubmit, rangesList, usersList, actionName } = props;

  return (
    <Formik
      validationSchema={roomSchema}
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
          <Form.Group as={Col} className="position-relative">
            <Form.Label>Available ranges</Form.Label>
            <Form.Control
              data-show-subtext="true"
              data-live-search="true"
              size="sm"
              as="select"
              name="availableRanges"
              multiple
              value={values.availableRanges}
              onChange={handleChange}
            >
              {rangesList.map((range, index) => {
                return (
                  <option data-tokens={range.name} key={index} value={range._id} className="border-bottom border-dark">
                    {range.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} className="position-relative">
            <Form.Label>Allowed users</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              name="allowedUsers"
              multiple
              value={values.allowedUsers}
              onChange={handleChange}
            >
              {usersList.map((user, index) => {
                return (
                  <option key={index} value={user._id} className="border-bottom border-dark">
                    {user.username}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} className="position-relative">
            <Form.Label>Banned users</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              name="bannedUsers"
              multiple
              value={values.bannedUsers}
              onChange={handleChange}
            >
              {usersList.map((user, index) => {
                return (
                  <option key={index} value={user._id} className="border-bottom border-dark">
                    {user.username}
                  </option>
                );
              })}
            </Form.Control>
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

export default RoomForm;
