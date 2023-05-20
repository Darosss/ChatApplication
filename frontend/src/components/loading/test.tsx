import React from "react";
import Loading from "./Loading";
import { render } from "@testing-library/react";
import { loadingElementId } from "@utils/dataTestIdsList";

describe("Loading", () => {
  test("renders without errors", () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId(loadingElementId)).toBeInTheDocument();
  });
});
