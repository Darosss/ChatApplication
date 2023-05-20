import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ChatRoom from "./ChatRoom";
import { faker } from "@faker-js/faker";
import { getAuthData, getMessageData, getMessageSocketData, getRoomData, getUserData } from "@src/tests/testData";
import { chatsIds } from "@src/utils/dataTestIdsList";
import { sendMessageSocket } from "../socket";

describe("ChatRoom", () => {
  test("renders ChatRoom properly with no data at all", () => {
    const room = getRoomData();
    const auth = getAuthData();
    const { getByTestId } = render(
      <ChatRoom
        room={room}
        auth={auth}
        localMessages={[]}
        dbMessages={[]}
        roomOnlineUsers={[]}
        roomTypingUsers={undefined}
      />,
    );

    expect(getByTestId(chatsIds.chatRoom)).toBeInTheDocument();
  });

  test("renders ChatRoom properly with displayed local messages", () => {
    const room = getRoomData();
    const auth = getAuthData();
    const localMessages = [getMessageSocketData(), getMessageSocketData()];
    const { getByText } = render(
      <ChatRoom
        room={room}
        auth={auth}
        localMessages={localMessages}
        dbMessages={[]}
        roomOnlineUsers={[]}
        roomTypingUsers={undefined}
      />,
    );

    localMessages.forEach((message) => expect(getByText(message.message)).toBeInTheDocument());
  });

  test("renders ChatRoom properly with displayed database messages", () => {
    const room = getRoomData();
    const auth = getAuthData();
    const dbMessages = [getMessageData(), getMessageData()];
    const { getByText } = render(
      <ChatRoom
        room={room}
        auth={auth}
        localMessages={[]}
        dbMessages={dbMessages}
        roomOnlineUsers={[]}
        roomTypingUsers={undefined}
      />,
    );

    dbMessages.forEach((message) => expect(getByText(message.message)).toBeInTheDocument());
  });

  test("renders ChatRoom properly with displayed room online users", () => {
    const room = getRoomData();
    const auth = getAuthData();
    const onlineUsers = [faker.internet.displayName(), faker.internet.displayName()];

    const { getByTestId } = render(
      <ChatRoom
        room={room}
        auth={auth}
        localMessages={[]}
        dbMessages={[]}
        roomOnlineUsers={onlineUsers}
        roomTypingUsers={undefined}
      />,
    );
    const toggleOnlineUsers = getByTestId(chatsIds.onlineUsersBtnToggle);

    fireEvent.click(toggleOnlineUsers);

    onlineUsers.forEach((user) => expect(screen.queryByText(user)).toBeInTheDocument());
  });

  test("renders ChatRoom properly with displayed typing user with username in room", () => {
    const room = getRoomData();
    const auth = getAuthData();
    const typingUser = faker.internet.displayName();
    const { getByText } = render(
      <ChatRoom
        room={room}
        auth={auth}
        localMessages={[]}
        dbMessages={[]}
        roomOnlineUsers={[]}
        roomTypingUsers={typingUser}
      />,
    );

    expect(getByText(new RegExp(typingUser, "i"))).toBeInTheDocument();
  });

  test("render ChatRoom with send message button", () => {
    const room = getRoomData();
    const auth = getAuthData();
    const { getByTestId } = render(
      <ChatRoom
        room={room}
        auth={auth}
        localMessages={[]}
        dbMessages={[]}
        roomOnlineUsers={[]}
        roomTypingUsers={undefined}
      />,
    );

    expect(getByTestId(chatsIds.sendMessageBtn)).toBeInTheDocument();
  });
});
