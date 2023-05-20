import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as hooks from "@hooks/authApi";

import App from "./App";
import { axiosResponseDefaultData } from "@src/tests/helpers";
import { IAuth } from "src/@types/types";
import * as dataTestIds from "@utils/dataTestIdsList";
import { getAuthData } from "@src/tests/testData";

const useGetSessionSpyName = "useGetSession";
const spyOnUseGetSession = (opts: { data?: IAuth; loading?: boolean; getSession?: jest.Mock<any, any> }) => {
  const { data, loading = false, getSession = jest.fn() } = opts;
  return jest.spyOn(hooks, useGetSessionSpyName).mockImplementation(() => ({
    authResponse: data ? { data: data, status: 200, ...axiosResponseDefaultData } : undefined,
    authLoading: loading,
    getSession: getSession,
    authError: undefined,
  }));
};

//todo add here spyONuseGetsession everywhere

describe("App", () => {
  test("renders loading state when authLoading is true", () => {
    spyOnUseGetSession({ loading: true });
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId(dataTestIds.loadingElementId)).toBeInTheDocument();
  });

  test("renders login routes when auth is undefined or null", () => {
    spyOnUseGetSession({});
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId(dataTestIds.loginlementId)).toBeInTheDocument();
  });
  test("renders register routes when auth is undefined or null", () => {
    spyOnUseGetSession({});
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId(dataTestIds.registerElementId)).toBeInTheDocument();
  });

  describe("routes when user is logged in", () => {
    describe("/home routes", () => {
      test("renders home element properly ", () => {
        spyOnUseGetSession({ data: getAuthData() });

        const { getByTestId } = render(
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.homeElementId)).toBeInTheDocument();
      });
    });

    describe("/login routes", () => {
      test("redirects /login to home element", () => {
        spyOnUseGetSession({ data: getAuthData() });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/login"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.homeElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.loginlementId)).not.toBeInTheDocument();
      });
    });

    describe("/register routes", () => {
      test("redirects /register to home element", () => {
        spyOnUseGetSession({ data: getAuthData() });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/register"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.homeElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.registerElementId)).not.toBeInTheDocument();
      });
    });

    describe("/chats routes", () => {
      test("renders chats element properly", () => {
        spyOnUseGetSession({ data: getAuthData() });

        const { getByTestId } = render(
          <MemoryRouter initialEntries={["/chats"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.chatsElementId)).toBeInTheDocument();
      });

      test("redirects /chats to profil when user banned", () => {
        spyOnUseGetSession({ data: getAuthData({ isBanned: true }) });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/chats"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.chatsElementId)).not.toBeInTheDocument();
      });
    });
    describe("/profil routes", () => {
      test("renders profil element properly", () => {
        spyOnUseGetSession({ data: getAuthData() });

        const { getByTestId } = render(
          <MemoryRouter initialEntries={["/profil"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
      });
    });
    describe("/rooms routes", () => {
      test("renders rooms element properly", () => {
        spyOnUseGetSession({ data: getAuthData() });

        const { getByTestId } = render(
          <MemoryRouter initialEntries={["/rooms"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.roomsElementId)).toBeInTheDocument();
      });
      test("redirects /rooms to profil when user is banned", () => {
        spyOnUseGetSession({ data: getAuthData({ isBanned: true }) });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/rooms"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.roomsElementId)).not.toBeInTheDocument();
      });
    });

    describe("/users routes", () => {
      test("renders users element properly when user is an admin", () => {
        spyOnUseGetSession({ data: getAuthData({ admin: true }) });

        const { getByTestId } = render(
          <MemoryRouter initialEntries={["/users"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.usersElementId)).toBeInTheDocument();
      });

      test("redirects /users to profil when user is not an admin", () => {
        spyOnUseGetSession({ data: getAuthData({ admin: false }) });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/users"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.usersElementId)).not.toBeInTheDocument();
      });
      test("redirects /users to profil when user is a banned admin", () => {
        spyOnUseGetSession({ data: getAuthData({ admin: true, isBanned: true }) });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/users"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.usersElementId)).not.toBeInTheDocument();
      });
    });

    describe("/ranges routes", () => {
      test("renders ranges element properly when user is an admin", () => {
        spyOnUseGetSession({ data: getAuthData({ admin: true }) });

        const { getByTestId } = render(
          <MemoryRouter initialEntries={["/ranges"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.rangesElementId)).toBeInTheDocument();
      });

      test("redirects /ranges to profil when user is not an admin", () => {
        spyOnUseGetSession({ data: getAuthData({ admin: false }) });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/ranges"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.rangesElementId)).not.toBeInTheDocument();
      });
      test("redirects /ranges to profil when user is a banned admin", () => {
        spyOnUseGetSession({ data: getAuthData({ admin: true, isBanned: true }) });

        const { getByTestId, queryByTestId } = render(
          <MemoryRouter initialEntries={["/ranges"]}>
            <App />
          </MemoryRouter>,
        );

        expect(getByTestId(dataTestIds.profilElementId)).toBeInTheDocument();
        expect(queryByTestId(dataTestIds.rangesElementId)).not.toBeInTheDocument();
      });
    });
  });
});
