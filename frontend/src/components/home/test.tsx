import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

const homeElementId = "home-element";

describe("Home", () => {
  test("renders without errors", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId(homeElementId)).toBeInTheDocument();
  });
});
