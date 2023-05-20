import React from "react";
import { render } from "@testing-library/react";
import Users from "./Users";
import { RenderRouterAndSendDataContextComponent, axiosResponseDefaultData } from "@src/tests/helpers";

import { usersElementId } from "@utils/dataTestIdsList";

const useGetUsers = "useGetUsers";
import * as usersHooks from "@hooks/usersApi";
import { getUserData } from "@src/tests/testData";
const sendData = jest.fn();
const mockedRefetchFn = jest.fn();

describe("Users", () => {
  test("renders Users component properly without data", () => {
    jest.spyOn(usersHooks, useGetUsers).mockImplementation(() => ({
      usersResponse: undefined,
      usersLoading: false,
      usersError: undefined,
      refetchUsers: mockedRefetchFn,
    }));

    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Users />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(usersElementId)).toBeInTheDocument();
  });

  test("renders Users component properly with single user", () => {
    const userData = [getUserData()];
    jest.spyOn(usersHooks, useGetUsers).mockImplementation(() => ({
      usersResponse: { data: { users: userData }, status: 200, ...axiosResponseDefaultData },
      usersLoading: false,
      usersError: undefined,
      refetchUsers: mockedRefetchFn,
    }));

    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Users />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(usersElementId)).toBeInTheDocument();
  });

  test("renders Users component properly with multiple users", () => {
    const usersData = [getUserData(), getUserData(), getUserData()];
    jest.spyOn(usersHooks, useGetUsers).mockImplementation(() => ({
      usersResponse: { data: { users: usersData }, status: 200, ...axiosResponseDefaultData },
      usersLoading: false,
      usersError: undefined,
      refetchUsers: mockedRefetchFn,
    }));

    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Users />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(usersElementId)).toBeInTheDocument();
  });
});
