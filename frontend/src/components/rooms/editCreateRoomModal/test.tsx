import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import RoomForm from "./RoomForm";
import { roomsIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as roomsHooks from "@hooks/roomsApi";
import { getRangeData, getRoomData, getUserData } from "@src/tests/testData";
import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { roomSchema } from "./validationSchema";

const sendData = jest.fn();
const mockedEditCreateRoom = jest.fn();

const useCreateOrUpdateRoom = "useCreateOrUpdateRoom";

describe("EditRoomModal", () => {
  describe("RoomForm", () => {
    test("renders RoomForm component and performs edit action", async () => {
      jest.spyOn(roomsHooks, useCreateOrUpdateRoom).mockImplementation(() => ({
        response: undefined,
        error: undefined,
        sendData: mockedEditCreateRoom,
      }));

      jest.mock("@hooks/usePostInfoHook", () => ({
        usePostInfoHook: () => ({ postInfo: null }),
      }));

      const editValues = {
        testName: faker.word.adjective(),
        availableRanges: [],
        allowedUsers: [],
        bannedUsers: [],
      };

      const roomEditMock = jest.fn();
      const userData = getUserData();
      const ranges = [getRangeData(userData), getRangeData(userData)];
      const users = [getUserData(), getUserData(), getUserData()];
      const room = getRoomData();

      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <RoomForm
            actionName="edit"
            initialValues={room}
            onSubmit={roomEditMock}
            rangesList={ranges}
            usersList={users}
          />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const roomEditForm = getByTestId(roomsIds.editCreateModal.form);
        const nameInput = getByTestId(roomsIds.editCreateModal.nameInput);
        const availableRangesInput = getByTestId(roomsIds.editCreateModal.availableRanges);
        const allowedUsersInput = getByTestId(roomsIds.editCreateModal.allowedUsers);
        const bannedUsersInput = getByTestId(roomsIds.editCreateModal.bannedUsers);

        fireEvent.change(nameInput, { target: { value: editValues.testName } });
        fireEvent.change(availableRangesInput, { target: { value: editValues.availableRanges } });
        fireEvent.change(allowedUsersInput, { target: { value: editValues.allowedUsers } });
        fireEvent.change(bannedUsersInput, { target: { value: editValues.bannedUsers } });

        fireEvent.submit(roomEditForm);
      });
      expect(roomEditMock).toHaveBeenCalledTimes(1);
    });
    test("renders RoomForm component and performs create action", async () => {
      jest.spyOn(roomsHooks, useCreateOrUpdateRoom).mockImplementation(() => ({
        response: undefined,
        error: undefined,
        sendData: mockedEditCreateRoom,
      }));

      jest.mock("@hooks/usePostInfoHook", () => ({
        usePostInfoHook: () => ({ postInfo: null }),
      }));

      const createValues = {
        testName: faker.word.adjective(),
        availableRanges: [],
        allowedUsers: [],
        bannedUsers: [],
      };

      const roomCreateMock = jest.fn();
      const userData = getUserData();
      const ranges = [getRangeData(userData), getRangeData(userData)];
      const users = [getUserData(), getUserData(), getUserData()];
      const room = getRoomData();

      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <RoomForm
            actionName="create"
            initialValues={room}
            onSubmit={roomCreateMock}
            rangesList={ranges}
            usersList={users}
          />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const roomCreateForm = getByTestId(roomsIds.editCreateModal.form);
        const nameInput = getByTestId(roomsIds.editCreateModal.nameInput);
        const availableRangesInput = getByTestId(roomsIds.editCreateModal.availableRanges);
        const allowedUsersInput = getByTestId(roomsIds.editCreateModal.allowedUsers);
        const bannedUsersInput = getByTestId(roomsIds.editCreateModal.bannedUsers);

        fireEvent.change(nameInput, { target: { value: createValues.testName } });
        fireEvent.change(availableRangesInput, { target: { value: createValues.availableRanges } });
        fireEvent.change(allowedUsersInput, { target: { value: createValues.allowedUsers } });
        fireEvent.change(bannedUsersInput, { target: { value: createValues.bannedUsers } });

        fireEvent.submit(roomCreateForm);
      });
      expect(roomCreateMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Room validation schema", () => {
    test("validates a valid edit / create room", async () => {
      const validForm = {
        name: faker.word.adjective(),
        availableRanges: [],
        allowedUsers: [],
        bannedUsers: [],
      };

      const isValid = await roomSchema.isValid(validForm);

      expect(isValid).toBe(true);
    });

    test("validates an invalid password in edit / create room", async () => {
      const invalidForm = {
        name: "",
        availableRanges: "kek",
        allowedUsers: "123",
        bannedUsers: 321,
      };
      try {
        await roomSchema.validate(invalidForm);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error instanceof ValidationError).toBe(true);
      }
    });
  });
});
