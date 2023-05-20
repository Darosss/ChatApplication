import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EditProfileForm from "./EditProfileForm";
import { profilIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as usersHooks from "@hooks/usersApi";
import { getStrongPassword } from "@src/tests/testData";
import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { editProfileSchema } from "./validationSchema";

const sendData = jest.fn();
const mockedEditUser = jest.fn();

const useEditUser = "useEditUser";
const initialValues = {
  username: "",
  firstname: "",
  surname: "",
  country: "",
  birthday: new Date(),
  gender: "",
  nickColor: "",
  email: "",
  phone: "",
  ranges: [],
};
describe("EditProfileModal", () => {
  describe("EditProfileForm", () => {
    test("renders EditProfileForm component and performs edit action", async () => {
      jest.spyOn(usersHooks, useEditUser).mockImplementation(() => ({
        userEditResponse: undefined,
        userEditError: undefined,
        userEdit: mockedEditUser,
      }));

      jest.mock("@hooks/usePostInfoHook", () => ({
        usePostInfoHook: () => ({ postInfo: null }),
      }));
      const startDate = new Date("1990-01-01");
      const endDate = new Date("2022-12-31");
      const strongPassword = getStrongPassword();

      const editValues = {
        testOldPassword: strongPassword,
        testNewPassword: strongPassword,
        testEmail: faker.internet.email(),
        testFirstname: faker.person.firstName(),
        testSurname: faker.person.lastName(),
        testBirthday: faker.date.between({ from: startDate, to: endDate }).toISOString().split("T")[0],
        testGender: faker.person.sex(),
        testCountry: faker.location.country(),
        testNickColor: faker.color.human(),
        testPhone: Number(faker.phone.number("#########")),
      };

      const profileEditMock = jest.fn();
      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <EditProfileForm initialValues={initialValues} onSubmit={profileEditMock} />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const userEditForm = getByTestId(profilIds.editProfile.form);
        const oldPasswordInput = getByTestId(profilIds.editProfile.oldPasswordInput);
        const newPasswordInput = getByTestId(profilIds.editProfile.newPasswordInput);
        const emailInput = getByTestId(profilIds.editProfile.emailInput);
        const firstnameInput = getByTestId(profilIds.editProfile.firstnameInput);
        const surnameInput = getByTestId(profilIds.editProfile.surnameInput);
        const birthdayInput = getByTestId(profilIds.editProfile.birthdayInput);
        const genderInput = getByTestId(profilIds.editProfile.genderInput);
        const countryInput = getByTestId(profilIds.editProfile.countryInput);
        const nickColorInput = getByTestId(profilIds.editProfile.nickColorInput);
        const phoneInput = getByTestId(profilIds.editProfile.phoneInput);

        fireEvent.change(oldPasswordInput, { target: { value: editValues.testOldPassword } });
        fireEvent.change(newPasswordInput, { target: { value: editValues.testNewPassword } });
        fireEvent.change(emailInput, { target: { value: editValues.testEmail } });
        fireEvent.change(firstnameInput, { target: { value: editValues.testFirstname } });
        fireEvent.change(surnameInput, { target: { value: editValues.testSurname } });
        fireEvent.change(birthdayInput, { target: { value: editValues.testBirthday } });
        fireEvent.change(genderInput, { target: { value: editValues.testGender } });
        fireEvent.change(countryInput, { target: { value: editValues.testCountry } });
        fireEvent.change(nickColorInput, { target: { value: editValues.testNickColor } });
        fireEvent.change(phoneInput, { target: { value: editValues.testPhone } });

        fireEvent.submit(userEditForm);
      });
      expect(profileEditMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Register validation schema", () => {
    test("validates a valid edit user form", async () => {
      const strongPassword = getStrongPassword();
      const validForm = {
        oldPassword: strongPassword,
        newPssword: strongPassword,
        email: faker.internet.email(),
        birthday: new Date(),
        phone: faker.phone.number("#########"),
      };

      const isValid = await editProfileSchema.isValid(validForm);

      expect(isValid).toBe(true);
    });

    test("validates an invalid password in register form", async () => {
      const invalidForm = {
        oldPassword: "weak",
        newPssword: "weak",
        email: "notanemail",
        birthday: "12122012",
        phone: "notaphone",
      };
      try {
        await editProfileSchema.validate(invalidForm);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error instanceof ValidationError).toBe(true);
      }
    });
  });
});
