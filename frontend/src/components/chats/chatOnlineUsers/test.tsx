import React from "react";
import { render } from "@testing-library/react";
import ChatOnlineUsers from "./ChatOnlineUsers";
import { faker } from "@faker-js/faker";

describe("ChatOnlineUsers", () => {
  test("renders ChatOnlineUsers properly with displayed usernames of users", () => {
    const users = [faker.internet.displayName(), faker.internet.displayName(), faker.internet.displayName()];
    const { getByText } = render(<ChatOnlineUsers onlineUsers={users} />);

    users.forEach((user) => {
      expect(getByText(user)).toBeInTheDocument();
    });
  });
});
