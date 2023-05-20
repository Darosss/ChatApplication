import React from "react";
import { render } from "@testing-library/react";
import UserRoomsList from "./UserRoomsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";

import { getRangeData, getRoomData, getUserData } from "@src/tests/testData";
const sendData = jest.fn();

describe("Rooms", () => {
  test("renders Rooms component properly with single room", () => {
    const userData = getUserData();
    const rangesData = [getRangeData(userData)];
    const roomsData = [getRoomData()];
    const usersData = [userData, getUserData()];

    const { getByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <UserRoomsList rooms={roomsData} users={usersData} ranges={rangesData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    roomsData.forEach((room) => {
      expect(getByText(new RegExp(room.name, "i"))).toBeInTheDocument();
    });
  });

  test("renders Rooms component properly with many rooms", () => {
    const userData = getUserData();
    const rangesData = [getRangeData(userData)];
    const roomsData = [getRoomData(), getRoomData(), getRoomData()];
    const usersData = [userData, getUserData()];

    const { getByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <UserRoomsList rooms={roomsData} users={usersData} ranges={rangesData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    roomsData.forEach((room) => {
      expect(getByText(new RegExp(room.name, "i"))).toBeInTheDocument();
    });
  });
});
