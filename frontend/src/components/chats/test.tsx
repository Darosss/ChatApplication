import React from "react";
import { render } from "@testing-library/react";
import Chats from "./Chats";
import {
  RenderMockedAuthContext,
  RenderRouterAndSendDataContextComponent,
  axiosResponseDefaultData,
} from "@src/tests/helpers";

import { chatsElementId } from "@utils/dataTestIdsList";

const useGetLoggedUserRooms = "useGetLoggedUserRooms";
const useGetRoomMessages = "useGetRoomMessages";
import * as roomsHooks from "@hooks/roomsApi";
import { getAuthData, getMessageData, getRoomData } from "@src/tests/testData";
import { faker } from "@faker-js/faker";
const sendData = jest.fn();
const mockedRefetchFn = jest.fn();

describe("Chats", () => {
  test("renders Chats component properly without data", () => {
    const auth = getAuthData();
    jest.spyOn(roomsHooks, useGetLoggedUserRooms).mockImplementation(() => ({
      roomsResponse: undefined,
      roomsLoading: false,
      roomsError: undefined,
      getUsersRoom: mockedRefetchFn,
    }));
    jest.spyOn(roomsHooks, useGetRoomMessages).mockImplementation(() => ({
      messagesResponse: undefined,
      messagesLoading: false,
      messagesError: undefined,
      getRoomMessages: mockedRefetchFn,
    }));

    const { getByTestId } = render(
      <RenderMockedAuthContext auth={auth} removeAuth={jest.fn()}>
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <Chats />
        </RenderRouterAndSendDataContextComponent>
      </RenderMockedAuthContext>,
    );

    expect(getByTestId(chatsElementId)).toBeInTheDocument();
  });

  test("renders Chats component properly with provided data", () => {
    const rooms = [getRoomData(), getRoomData()];
    const roomMessages = [getMessageData(), getMessageData()];
    const auth = getAuthData();
    jest.spyOn(roomsHooks, useGetLoggedUserRooms).mockImplementation(() => ({
      roomsResponse: { data: { rooms: rooms }, status: 200, ...axiosResponseDefaultData },
      roomsLoading: false,
      roomsError: undefined,
      getUsersRoom: mockedRefetchFn,
    }));
    jest.spyOn(roomsHooks, useGetRoomMessages).mockImplementation(() => ({
      messagesResponse: {
        data: {
          chatRoom: {
            id: faker.database.mongodbObjectId(),
            messages: roomMessages,
          },
        },
        status: 200,
        ...axiosResponseDefaultData,
      },
      messagesLoading: false,
      messagesError: undefined,
      getRoomMessages: mockedRefetchFn,
    }));

    const { getByTestId } = render(
      <RenderMockedAuthContext auth={auth} removeAuth={jest.fn()}>
        <RenderRouterAndSendDataContextComponent sendData={sendData}>
          <Chats />
        </RenderRouterAndSendDataContextComponent>
        ,
      </RenderMockedAuthContext>,
    );

    expect(getByTestId(chatsElementId)).toBeInTheDocument();
  });
});
