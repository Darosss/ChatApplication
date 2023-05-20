import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import RangeForm from "./RangeForm";
import { rangesIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as rangesHooks from "@hooks/rangesApi";
import { getRoomData } from "@src/tests/testData";
import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";
import { rangeSchema } from "./validationSchema";

const sendData = jest.fn();
const mockedEditCreateRoom = jest.fn();

const useCreateOrUpdateRoom = "useCreateOrUpdateRange";

describe("EditUserModal", () => {
  describe("RangeForm", () => {
    test("renders RangeForm component and performs edit action", async () => {
      jest.spyOn(rangesHooks, useCreateOrUpdateRoom).mockImplementation(() => ({
        response: undefined,
        error: undefined,
        sendData: mockedEditCreateRoom,
      }));

      jest.mock("@hooks/usePostInfoHook", () => ({
        usePostInfoHook: () => ({ postInfo: null }),
      }));

      const editValues = {
        testName: faker.word.adjective(),
      };

      const rangeEditMock = jest.fn();
      const range = getRoomData();

      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <RangeForm actionName="edit" initialValues={range} onSubmit={rangeEditMock} />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const rangeEditForm = getByTestId(rangesIds.editCreateModal.form);
        const nameInput = getByTestId(rangesIds.editCreateModal.nameInput);

        fireEvent.change(nameInput, { target: { value: editValues.testName } });

        fireEvent.submit(rangeEditForm);
      });
      expect(rangeEditMock).toHaveBeenCalledTimes(1);
    });
    test("renders RangeForm component and performs create action", async () => {
      jest.spyOn(rangesHooks, useCreateOrUpdateRoom).mockImplementation(() => ({
        response: undefined,
        error: undefined,
        sendData: mockedEditCreateRoom,
      }));

      jest.mock("@hooks/usePostInfoHook", () => ({
        usePostInfoHook: () => ({ postInfo: null }),
      }));

      const createValues = {
        testName: faker.word.adjective(),
      };

      const rangeCreateMock = jest.fn();
      const range = getRoomData();

      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <RangeForm actionName="create" initialValues={range} onSubmit={rangeCreateMock} />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const rangeCreateForm = getByTestId(rangesIds.editCreateModal.form);
        const nameInput = getByTestId(rangesIds.editCreateModal.nameInput);

        fireEvent.change(nameInput, { target: { value: createValues.testName } });

        fireEvent.submit(rangeCreateForm);
      });
      expect(rangeCreateMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Room validation schema", () => {
    test("validates a valid edit / create range", async () => {
      const validForm = {
        name: faker.word.adjective(),
      };

      const isValid = await rangeSchema.isValid(validForm);

      expect(isValid).toBe(true);
    });

    test("validates an invalid password in edit / create range", async () => {
      const invalidForm = {
        name: "",
      };
      try {
        await rangeSchema.validate(invalidForm);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error instanceof ValidationError).toBe(true);
      }
    });
  });
});
