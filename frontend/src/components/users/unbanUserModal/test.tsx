import React from "react";

import { render, fireEvent } from "@testing-library/react";
import UnbanUserModal from "./UnbanUserModal";
import { modalIds, usersIds } from "@src/utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import * as usersHooks from "@hooks/usersApi";
import { faker } from "@faker-js/faker";

const sendData = jest.fn();
const mockedUnbanUsers = jest.fn();

const useUnbanUser = "useUnbanUser";

describe("UnbanUserModal", () => {
  test("renders UnbanUserModal component and performs ban action", () => {
    jest.spyOn(usersHooks, useUnbanUser).mockImplementation(() => ({
      unbanResponse: undefined,
      unbanError: undefined,
      unbanUser: mockedUnbanUsers,
    }));
    jest.mock("@hooks/usePostInfoHook", () => ({
      usePostInfoHook: () => ({ postInfo: null }),
    }));

    const userId = faker.database.mongodbObjectId();
    const username = faker.internet.displayName();
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <UnbanUserModal userId={userId} username={username} />
      </RenderRouterAndSendDataContextComponent>,
    );

    const toggleBanModalBtn = getByTestId(modalIds.toggleBtn);
    fireEvent.click(toggleBanModalBtn);

    const unbanButton = getByTestId(usersIds.unbanUserModal.unbanSubmitButton);
    fireEvent.click(unbanButton);

    expect(mockedUnbanUsers).toHaveBeenCalledTimes(1);
  });
});
