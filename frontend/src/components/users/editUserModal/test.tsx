import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EditUserForm from "./EditUserForm";
import { usersIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as usersHooks from "@hooks/usersApi";
import { getRangeData, getRoomData, getUserData } from "@src/tests/testData";
import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { editUserSchema } from "./validationSchema";

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
describe("EditUserModal", () => {
  describe("EditUserForm", () => {
    test("renders EditUserForm component and performs edit action", async () => {
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

      const editValues = {
        testUsername: faker.internet.userName({ firstName: "Random" }),
        testEmail: faker.internet.email(),
        testFirstname: faker.person.firstName(),
        testSurname: faker.person.lastName(),
        testBirthday: faker.date.between({ from: startDate, to: endDate }).toISOString().split("T")[0],
        testGender: faker.person.sex(),
        testCountry: faker.location.country(),
        testNickColor: faker.color.human(),
        testPhone: Number(faker.phone.number("#########")),
      };

      const userEditMock = jest.fn();
      const userData = getUserData();
      const ranges = [getRangeData(userData), getRangeData(userData)];
      const users = [getUserData(), getUserData(), getUserData()];
      const userChatRooms = [getRoomData(), getRoomData()];

      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <EditUserForm
            initialValues={initialValues}
            onSubmit={userEditMock}
            rangesList={ranges}
            usersList={users}
            userRoomsList={userChatRooms}
          />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const userEditForm = getByTestId(usersIds.editUserModal.form);
        const usernameInput = getByTestId(usersIds.editUserModal.usernameInput);
        const emailInput = getByTestId(usersIds.editUserModal.emailInput);
        const firstnameInput = getByTestId(usersIds.editUserModal.firstnameInput);
        const surnameInput = getByTestId(usersIds.editUserModal.surnameInput);
        const birthdayInput = getByTestId(usersIds.editUserModal.birthdayInput);
        const genderInput = getByTestId(usersIds.editUserModal.genderInput);
        const countryInput = getByTestId(usersIds.editUserModal.countryInput);
        const nickColorInput = getByTestId(usersIds.editUserModal.nickColorInput);
        const phoneInput = getByTestId(usersIds.editUserModal.phoneInput);

        fireEvent.change(usernameInput, { target: { value: editValues.testUsername } });
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
      expect(userEditMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Register validation schema", () => {
    test("validates a valid edit user form", async () => {
      const validForm = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        birthday: new Date(),
        phone: faker.phone.number("#########"),
      };

      const isValid = await editUserSchema.isValid(validForm);

      expect(isValid).toBe(true);
    });

    test("validates an invalid password in register form", async () => {
      const invalidForm = {
        username: "",
        email: "walidemail",
        birthday: "12 12 2021",
        phone: "123&@#!&",
      };

      try {
        await editUserSchema.validate(invalidForm);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error instanceof ValidationError).toBe(true);
      }
    });
  });
});
