import React from "react";
import { render } from "@testing-library/react";
import Rooms from "./Rooms";
import { RenderRouterAndSendDataContextComponent, axiosResponseDefaultData } from "@src/tests/helpers";

import { roomsElementId } from "@utils/dataTestIdsList";

const useGetRooms = "useGetRooms";
const useGetRanges = "useGetRanges";
const useGetUsers = "useGetUsers";
import * as roomsHooks from "@hooks/roomsApi";
import * as rangesHooks from "@hooks/rangesApi";
import * as usersHooks from "@hooks/usersApi";
import { getRangeData, getRoomData, getUserData } from "@src/tests/testData";
const sendData = jest.fn();
const mockedRefetchFn = jest.fn();

describe("Rooms", () => {
  test("renders Rooms component properly without data", () => {
    jest.spyOn(roomsHooks, useGetRooms).mockImplementation(() => ({
      roomsResponse: undefined,
      roomsLoading: false,
      roomsError: undefined,
      refetchRooms: mockedRefetchFn,
    }));
    jest.spyOn(rangesHooks, useGetRanges).mockImplementation(() => ({
      rangesResponse: undefined,
      rangesLoading: false,
      rangesError: undefined,
      refetchRanges: mockedRefetchFn,
    }));
    jest.spyOn(usersHooks, useGetUsers).mockImplementation(() => ({
      usersResponse: undefined,
      usersLoading: false,
      usersError: undefined,
      refetchUsers: mockedRefetchFn,
    }));

    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Rooms />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(roomsElementId)).toBeInTheDocument();
  });

  test("renders Rooms component properly with data", () => {
    const userData = getUserData();
    const rangesData = [getRangeData(userData)];
    const roomsData = [getRoomData()];
    const usersData = [userData, getUserData()];
    const sendData = jest.fn();
    const roomsFn = jest.fn();
    jest.spyOn(roomsHooks, useGetRooms).mockImplementation(() => ({
      roomsResponse: { data: { rooms: roomsData }, status: 200, ...axiosResponseDefaultData },
      roomsLoading: false,
      roomsError: undefined,
      refetchRooms: roomsFn,
    }));
    jest.spyOn(rangesHooks, useGetRanges).mockImplementation(() => ({
      rangesResponse: { data: { ranges: rangesData }, status: 200, ...axiosResponseDefaultData },
      rangesLoading: false,
      rangesError: undefined,
      refetchRanges: roomsFn,
    }));
    jest.spyOn(usersHooks, useGetUsers).mockImplementation(() => ({
      usersResponse: { data: { users: usersData }, status: 200, ...axiosResponseDefaultData },
      usersLoading: false,
      usersError: undefined,
      refetchUsers: roomsFn,
    }));

    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Rooms />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(roomsElementId)).toBeInTheDocument();
  });
});
