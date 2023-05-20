import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BanUserModal from "./BanUserModal";
import { modalIds, usersIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as usersHooks from "@hooks/usersApi";
import { faker } from "@faker-js/faker";

const sendData = jest.fn();
const mockedBanUser = jest.fn();

const useBanUser = "useBanUser";
describe("BanUserModal", () => {
  test("renders BanUserModal component and performs ban action", () => {
    jest.spyOn(usersHooks, useBanUser).mockImplementation(() => ({
      banResponse: undefined,
      banError: undefined,
      banUser: mockedBanUser,
    }));
    jest.mock("@hooks/usePostInfoHook", () => ({
      usePostInfoHook: () => ({ postInfo: null }),
    }));

    const userId = faker.database.mongodbObjectId();
    const username = faker.internet.displayName();
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <BanUserModal userId={userId} username={username} />
      </RenderRouterAndSendDataContextComponent>,
    );

    const toggleBanModalBtn = getByTestId(modalIds.toggleBtn);
    fireEvent.click(toggleBanModalBtn);

    const banTimeInput = getByTestId(usersIds.banUserModal.banTimeInput);
    fireEvent.change(banTimeInput, { target: { value: "10" } });

    const banReasonInput = getByTestId(usersIds.banUserModal.banReasonInput);
    fireEvent.change(banReasonInput, { target: { value: "Violating community guidelines" } });

    const banButton = getByTestId(usersIds.banUserModal.banSubmitButton);
    fireEvent.click(banButton);

    expect(mockedBanUser).toHaveBeenCalledTimes(1);
  });
});
