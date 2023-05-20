import React from "react";

import { render } from "@testing-library/react";
import UsersList from "./UsersList";
import { faker } from "@faker-js/faker";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";

const getTestUserData = (isBanned = false) => {
  const user = {
    _id: faker.database.mongodbObjectId(),
    username: faker.internet.displayName(),
    firstname: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    birthday: faker.date.anytime(),
    createdAt: faker.date.anytime(),
    country: faker.location.country(),
    gender: faker.person.sex(),
    phone: faker.phone.number(),
    nickColor: faker.color.human(),
    ranges: [],
    isBanned: false,
  };

  return isBanned
    ? { ...user, isBanned: true, bannedDate: faker.date.anytime(), banExpiresDate: faker.date.anytime() }
    : user;
};

describe("Profil details", () => {
  test("renders UsersList component with single user and display username", () => {
    const usersData = [getTestUserData()];
    const { getByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={jest.fn()}>
        <UsersList users={usersData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    usersData.forEach((user) => expect(getByText(user.username)).toBeInTheDocument());
  });

  test("renders UsersList component with multiple users and display their usernames", () => {
    const usersData = [getTestUserData(), getTestUserData(), getTestUserData()];
    const { getByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={jest.fn()}>
        <UsersList users={usersData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    usersData.forEach((user) => expect(getByText(user.username)).toBeInTheDocument());
  });

  test("renders UsersList component with multiple users and Edit button for each of them", () => {
    const usersData = [getTestUserData(), getTestUserData(), getTestUserData()];
    const { getAllByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={jest.fn()}>
        <UsersList users={usersData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getAllByText(new RegExp("Edit", "i")).length).toBe(usersData.length);
  });
});
