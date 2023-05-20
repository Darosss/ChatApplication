import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeleteRangeModal from "./DeleteRangeModal";
import { modalIds, rangesIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as rangesHooks from "@hooks/rangesApi";
import { faker } from "@faker-js/faker";

const sendData = jest.fn();
const mockedDeleteRoom = jest.fn();

const useDeleteRange = "useDeleteRange";

describe("DeleteRangeModal", () => {
  test("renders DeleteRangeModal component and performs ban action", () => {
    jest.spyOn(rangesHooks, useDeleteRange).mockImplementation(() => ({
      rangeDeleteResponse: undefined,
      rangeDeleteError: undefined,
      deleteRange: mockedDeleteRoom,
    }));
    jest.mock("@hooks/usePostInfoHook", () => ({
      usePostInfoHook: () => ({ postInfo: null }),
    }));

    const rangeId = faker.database.mongodbObjectId();
    const rangeName = faker.word.adjective();
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <DeleteRangeModal rangeId={rangeId} rangeName={rangeName} />
      </RenderRouterAndSendDataContextComponent>,
    );

    const toggleBanModalBtn = getByTestId(modalIds.toggleBtn);
    fireEvent.click(toggleBanModalBtn);

    const rangeDeleteButton = getByTestId(rangesIds.deleteRangeModal.rangeDeleteSubmitButton);
    fireEvent.click(rangeDeleteButton);

    expect(mockedDeleteRoom).toHaveBeenCalledTimes(1);
  });
});
