import React from "react";
import { render } from "@testing-library/react";
import PostInfo from "./PostInfo";
import { postInfoElementId } from "@utils/dataTestIdsList";

describe("PostInfo", () => {
  test("renders info properly ", () => {
    const info = "test-info-123";
    const { getByTestId } = render(<PostInfo info={info} />);

    expect(getByTestId(postInfoElementId)).toHaveTextContent(info);
  });
});
