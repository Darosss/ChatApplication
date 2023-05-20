import React from "react";

import { render } from "@testing-library/react";
import ProfilDetails from "./ProfilDetails";
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
  test("renders ProfilDetails component with all needed user data", () => {
    const userData = getTestUserData();
    const { getByText, queryByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={jest.fn()}>
        <ProfilDetails user={userData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByText(userData.username)).toBeInTheDocument();
    expect(getByText(userData.firstname)).toBeInTheDocument();
    expect(getByText(userData.surname)).toBeInTheDocument();
    expect(getByText(userData.email)).toBeInTheDocument();
    expect(getByText(userData.country)).toBeInTheDocument();
    expect(getByText(new RegExp("birthday", "i"))).toBeInTheDocument();
    expect(getByText(userData.gender)).toBeInTheDocument();
    expect(getByText(userData.phone)).toBeInTheDocument();
    expect(getByText(userData.nickColor)).toBeInTheDocument();

    expect(queryByText(new RegExp("banned", "i"))).not.toBeInTheDocument();
  });

  test("renders ProfilDetails component with all needed user data when user banned", () => {
    const userData = getTestUserData(true);
    const { getByText, getAllByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={jest.fn()}>
        <ProfilDetails user={userData} />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByText(userData.username)).toBeInTheDocument();
    expect(getByText(userData.firstname)).toBeInTheDocument();
    expect(getByText(userData.surname)).toBeInTheDocument();
    expect(getByText(userData.email)).toBeInTheDocument();
    expect(getByText(userData.country)).toBeInTheDocument();
    expect(getByText(new RegExp("birthday", "i"))).toBeInTheDocument();
    expect(getByText(userData.gender)).toBeInTheDocument();
    expect(getByText(userData.phone)).toBeInTheDocument();
    expect(getByText(userData.nickColor)).toBeInTheDocument();

    expect(getAllByText(new RegExp("banned", "i")).length).toBeGreaterThanOrEqual(1);
  });
});
