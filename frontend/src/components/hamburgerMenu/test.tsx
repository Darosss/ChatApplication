import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";

const hamburgetElementId = "hamburger-menu-element";

describe("HamburgerMenu", () => {
  test("renders without errors", () => {
    const menuRef = { current: { classList: { toggle: jest.fn() } } };
    render(<HamburgerMenu menu={menuRef} />);
  });

  describe("renders correctly on different screen sizes", () => {
    test("is hidden on wide screens >= 1024", () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
      const menuRef = { current: { classList: { toggle: jest.fn() } } };
      const { getByTestId } = render(<HamburgerMenu menu={menuRef} />);

      expect(getByTestId(hamburgetElementId)).not.toBeVisible();
    });

    test("is hidden on medium screens >= 768", () => {
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 768 });
      const menuRef = { current: { classList: { toggle: jest.fn() } } };
      const { getByTestId } = render(<HamburgerMenu menu={menuRef} />);

      expect(getByTestId(hamburgetElementId)).not.toBeVisible();
    });
    test("is visible on smaller screens <= 767", () => {
      const menuRef = { current: { classList: { toggle: jest.fn() } } };
      const { getByTestId } = render(<HamburgerMenu menu={menuRef} />);
      Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 767 });

      expect(getByTestId(hamburgetElementId)).toBeVisible();
    });
  });

  test("toggles navigation menu on button click", () => {
    const menuRef = { current: { classList: { toggle: jest.fn() } } };

    const { getByRole } = render(<HamburgerMenu menu={menuRef} />);

    const button = getByRole("button", { hidden: true });
    fireEvent.click(button);

    expect(menuRef.current.classList.toggle).toHaveBeenCalledTimes(1);
  });
});
