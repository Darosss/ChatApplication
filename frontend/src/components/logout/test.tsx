import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Logout from "./Logout";
import { RenderRouterAndAuthContextComponent } from "@src/tests/helpers";

import * as authHooks from "@hooks/authApi";
import { logoutElementId } from "@utils/dataTestIdsList";
const useLogoutSpyName = "useLogout";

import { AxiosRequestHeaders } from "axios";
import { getAuthData } from "@src/tests/testData";
jest.mock("axios");

describe("Logout", () => {
  test("renders Logout button", () => {
    const { getByTestId } = render(
      <RenderRouterAndAuthContextComponent auth={getAuthData()}>
        <Logout />
      </RenderRouterAndAuthContextComponent>,
    );

    expect(getByTestId(logoutElementId)).toBeInTheDocument();
  });

  test("calls logout function on button click", () => {
    const logoutFn = jest.fn();
    jest.spyOn(authHooks, useLogoutSpyName).mockImplementation(() => ({
      logoutResponse: undefined,
      logoutLoading: false,
      logout: logoutFn,
      logoutError: undefined,
    }));
    const { getByTestId } = render(
      <RenderRouterAndAuthContextComponent auth={getAuthData()}>
        <Logout />
      </RenderRouterAndAuthContextComponent>,
    );

    const logoutButton = getByTestId(logoutElementId);
    fireEvent.click(logoutButton);

    expect(logoutFn).toHaveBeenCalled();
  });

  test("updates auth context value on logout response", () => {
    const mockedRemoveAuth = jest.fn();
    jest.spyOn(authHooks, useLogoutSpyName).mockImplementation(() => ({
      logoutResponse: {
        data: { message: "Logout successfully" },
        status: 200,
        statusText: "",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      },
      logoutLoading: false,
      logout: jest.fn(),
      logoutError: undefined,
    }));

    const { getByTestId } = render(
      <RenderRouterAndAuthContextComponent auth={getAuthData()} removeAuth={mockedRemoveAuth}>
        <Logout />
      </RenderRouterAndAuthContextComponent>,
    );

    const logoutButton = getByTestId(logoutElementId);
    fireEvent.click(logoutButton);

    expect(mockedRemoveAuth).toHaveBeenCalledTimes(1);
  });
});
