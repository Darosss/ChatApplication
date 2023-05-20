import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Modal from "./Modal";
import { modalIds } from "@utils/dataTestIdsList";

const actionName = "action name test";
const postInfo = "postinfo text test";
const testChildrenText = "children text test";
describe("Modal", () => {
  test("renders hidden modal elements properly", () => {
    const { getByTestId } = render(
      <Modal actionBtnVariant="danger" actionName={actionName} postInfo={postInfo}>
        <>{testChildrenText}</>
      </Modal>,
    );

    expect(getByTestId(modalIds.toggleBtn)).toBeInTheDocument();
  });

  test("sets show to true", () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    const { getByTestId } = render(
      <Modal actionBtnVariant="danger" actionName={actionName} postInfo={postInfo}>
        <>{testChildrenText}</>
      </Modal>,
    );

    const button = getByTestId(modalIds.toggleBtn);
    fireEvent.click(button);

    expect(setStateMock).toHaveBeenCalledWith(true);
  });
});
