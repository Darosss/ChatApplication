import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
import { registerFormIds, registerElementId } from "@utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import RegisterForm from "./RegisterForm";
import { registerSchema } from "./validationSchema";
import { ValidationError } from "yup";
import { UserRegisterData } from "@src/@types/types";
import { faker } from "@faker-js/faker";
import { getStrongPassword } from "@src/tests/testData";

const initialRegisterValues: UserRegisterData = {
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
};

describe("Register", () => {
  test("renders register component", () => {
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent>
        <Register />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(registerElementId)).toBeInTheDocument();
  });

  describe("RegisterForm", () => {
    test("submits register form", async () => {
      const startDate = new Date("1990-01-01");
      const endDate = new Date("2022-12-31");

      const registerValues = {
        testUsername: faker.internet.userName({ firstName: "Random" }),
        testPassword: getStrongPassword(),
        testEmail: faker.internet.email(),
        testFirstname: faker.person.firstName(),
        testSurname: faker.person.lastName(),
        testBirthday: faker.date.between({ from: startDate, to: endDate }).toISOString().split("T")[0],
        testGender: faker.person.sex(),
        testCountry: faker.location.country(),
        testNickColor: faker.color.human(),
        testPhone: Number(faker.phone.number("#########")),
      };
      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent>
          <RegisterForm initialValues={initialRegisterValues} onSubmit={onSubmit} />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const form = getByTestId(registerFormIds.form);
        const usernameInput = getByTestId(registerFormIds.usernameInput);
        const passwordInput = getByTestId(registerFormIds.passwordInput);
        const emailInput = getByTestId(registerFormIds.emailInput);
        const firstnameInput = getByTestId(registerFormIds.firstnameInput);
        const surnameInput = getByTestId(registerFormIds.surnameInput);
        const birthdayInput = getByTestId(registerFormIds.birthdayInput);
        const genderInput = getByTestId(registerFormIds.genderInput);
        const countryInput = getByTestId(registerFormIds.countryInput);
        const nickColorInput = getByTestId(registerFormIds.nickColorInput);
        const phoneInput = getByTestId(registerFormIds.phoneInput);

        fireEvent.change(usernameInput, { target: { value: registerValues.testUsername } });
        fireEvent.change(passwordInput, { target: { value: registerValues.testPassword } });
        fireEvent.change(emailInput, { target: { value: registerValues.testEmail } });
        fireEvent.change(firstnameInput, { target: { value: registerValues.testFirstname } });
        fireEvent.change(surnameInput, { target: { value: registerValues.testSurname } });
        fireEvent.change(birthdayInput, { target: { value: registerValues.testBirthday } });
        fireEvent.change(genderInput, { target: { value: registerValues.testGender } });
        fireEvent.change(countryInput, { target: { value: registerValues.testCountry } });
        fireEvent.change(nickColorInput, { target: { value: registerValues.testNickColor } });
        fireEvent.change(phoneInput, { target: { value: registerValues.testPhone } });
        fireEvent.submit(form);
      });

      expect(onSubmit).toHaveBeenCalledWith({
        username: registerValues.testUsername,
        password: registerValues.testPassword,
        firstname: registerValues.testFirstname,
        surname: registerValues.testSurname,
        birthday: registerValues.testBirthday,
        country: registerValues.testCountry,
        gender: registerValues.testGender,
        nickColor: registerValues.testNickColor,
        email: registerValues.testEmail,
        phone: registerValues.testPhone,
      });
    });
  });

  describe("Register validation schema", () => {
    test("validates a valid register form", async () => {
      const validForm = {
        username: faker.internet.displayName(),
        password: getStrongPassword(),
        email: faker.internet.email(),
        birthday: new Date(),
        phone: faker.phone.number("#########"),
      };

      const isValid = await registerSchema.isValid(validForm);

      expect(isValid).toBe(true);
    });

    test("validates an invalid password in register form", async () => {
      const invalidForm = {
        username: "",
        password: "weakpassword",
        phone: "wrong phone",
        email: "wrong email",
        birthday: "wrong birthday",
      };

      try {
        await registerSchema.validate(invalidForm);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error instanceof ValidationError).toBe(true);
      }
    });
  });
});
