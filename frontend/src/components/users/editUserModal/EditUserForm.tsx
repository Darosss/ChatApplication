import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { editUserSchema } from "./validationSchema";
import UserRooms from "./UserRooms";
interface EditUserFormProps {
  initialValues: UserUpdateData;
  onSubmit: (values: UserUpdateData) => void;
  rangesList: IRangeRes[];
  usersList: IUserRes[];
  userRoomsList: IChatRoomRes[];
}
function RegisterForm(props: EditUserFormProps) {
  const { initialValues, onSubmit, rangesList, usersList, userRoomsList } = props;

  return (
    <>
      <Formik
        validationSchema={editUserSchema}
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

            <Form.Group as={Col} controlId="validation-phoneNumber">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phoneNumber"
                type="text"
                value={values.phoneNumber}
                onChange={handleChange}
                isValid={touched.phoneNumber && !errors.phoneNumber}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>User ranges</Form.Label>
              <Form.Control size="sm" as="select" name="ranges" multiple value={values.ranges} onChange={handleChange}>
                {rangesList.map((range, index) => {
                  return (
                    <option key={index} value={range._id} className="border-bottom border-dark">
                      {range.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="m-5">
              <Button type="submit" className="btn btn-primary w-100">
                Edit
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
      {userRoomsList.length > 0 ? (
        <UserRooms userRooms={userRoomsList} rangesList={rangesList} usersList={usersList} />
      ) : (
        "User doesnt have any created rooms"
      )}
    </>
  );
}

export default RegisterForm;
