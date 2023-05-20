import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeleteRoomModal from "./DeleteRoomModal";
import { modalIds, roomsIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as roomsHooks from "@hooks/roomsApi";
import { faker } from "@faker-js/faker";

const sendData = jest.fn();
const mockedDeleteRoom = jest.fn();

const useDeleteRoom = "useDeleteRoom";

describe("DeleteRoomModal", () => {
  test("renders DeleteRoomModal component and performs ban action", () => {
    jest.spyOn(roomsHooks, useDeleteRoom).mockImplementation(() => ({
      roomDeleteResponse: undefined,
      roomDeleteError: undefined,
      deleteRoom: mockedDeleteRoom,
    }));
    jest.mock("@hooks/usePostInfoHook", () => ({
      usePostInfoHook: () => ({ postInfo: null }),
    }));

    const roomId = faker.database.mongodbObjectId();
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <DeleteRoomModal roomId={roomId} />
      </RenderRouterAndSendDataContextComponent>,
    );

    const toggleBanModalBtn = getByTestId(modalIds.toggleBtn);
    fireEvent.click(toggleBanModalBtn);

    const roomDeleteButton = getByTestId(roomsIds.deleteRoomModal.roomDeleteSubmitButton);
    fireEvent.click(roomDeleteButton);

    expect(mockedDeleteRoom).toHaveBeenCalledTimes(1);
  });
});
