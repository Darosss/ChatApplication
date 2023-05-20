import React from "react";
import { render } from "@testing-library/react";

import NavigationBar from "./NavigationBar";
import { RenderMockedAuthContext, RouterWrapper } from "@src/tests/helpers";
import { IAuth } from "src/@types/types";
import NavigationLink from "./NavigationLink";
import { logoutElementId, navigationBarIds } from "@utils/dataTestIdsList";
import { getAuthData } from "@src/tests/testData";

function RenderWrappedNavigationBar(props: { auth?: IAuth | null; removeAuth?: jest.Mock }) {
  const { auth = null, removeAuth = jest.fn() } = props;
  return (
    <RouterWrapper>
      {auth ? (
        <RenderMockedAuthContext auth={auth} removeAuth={removeAuth}>
          <NavigationBar />
        </RenderMockedAuthContext>
      ) : (
        <NavigationBar />
      )}
    </RouterWrapper>
  );
}

describe("NavigationBar", () => {
  test("renders navigation links correctly when user is authenticated", () => {
    const { getByTestId, queryByTestId } = render(<RenderWrappedNavigationBar auth={getAuthData()} />);
    expect(getByTestId(navigationBarIds.home)).toBeInTheDocument();
    expect(getByTestId(navigationBarIds.chats)).toBeInTheDocument();
    expect(getByTestId(navigationBarIds.rooms)).toBeInTheDocument();
    expect(getByTestId(navigationBarIds.profil)).toBeInTheDocument();
    expect(getByTestId(logoutElementId)).toBeInTheDocument();

    // Assert that the navigation links for non-authenticated users are not rendered
    expect(queryByTestId(navigationBarIds.login)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.register)).not.toBeInTheDocument();

    // Assert that the navigation links for non admins users are not rendered
    expect(queryByTestId(navigationBarIds.users)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.ranges)).not.toBeInTheDocument();
  });
  test("renders navigation links correctly when user is authenticated and is administrator", () => {
    const { getByTestId, queryByTestId } = render(
      <RenderWrappedNavigationBar
        auth={getAuthData({
          admin: true,
        })}
      />,
    );
    expect(getByTestId(navigationBarIds.home)).toBeInTheDocument();
    expect(getByTestId(navigationBarIds.chats)).toBeInTheDocument();
    expect(getByTestId(navigationBarIds.rooms)).toBeInTheDocument();
    expect(getByTestId(navigationBarIds.profil)).toBeInTheDocument();
    expect(getByTestId(logoutElementId)).toBeInTheDocument();
    // Assert that the navigation links for admins users are rendered
    expect(queryByTestId(navigationBarIds.users)).toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.ranges)).toBeInTheDocument();

    // Assert that the navigation links for non-authenticated users are not rendered
    expect(queryByTestId(navigationBarIds.login)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.register)).not.toBeInTheDocument();
  });

  test("renders navigation links correctly when user is not logged in", () => {
    const { getByTestId, queryByTestId } = render(<RenderWrappedNavigationBar />);
    expect(getByTestId(navigationBarIds.home)).toBeInTheDocument();

    // Assert that the navigation links for non-authenticated users only rendered
    expect(queryByTestId(navigationBarIds.login)).toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.register)).toBeInTheDocument();

    // Assert that the navigation links for authenticated users are not rendered
    expect(queryByTestId(navigationBarIds.chats)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.rooms)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.profil)).not.toBeInTheDocument();
    expect(queryByTestId(logoutElementId)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.users)).not.toBeInTheDocument();
    expect(queryByTestId(navigationBarIds.ranges)).not.toBeInTheDocument();
  });
});

describe("NavigationLink", () => {
  test("renders navigation link with correct url and name", () => {
    const url = "/test";
    const name = "Test Link";

    const { getByText, getByRole } = render(
      <RouterWrapper>
        <NavigationLink dataTestId="testid" url={url} name={name} />
      </RouterWrapper>,
    );

    const linkElement = getByRole("link", { name: name });
    expect(linkElement).toHaveAttribute("href", url);
    expect(getByText(name)).toBeInTheDocument();
  });
});
