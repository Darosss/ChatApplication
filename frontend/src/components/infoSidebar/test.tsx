import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import InfoSidebar from "./InfoSidebar";
import { infoSidebarIds } from "@utils/dataTestIdsList";

const testTitle = "test title";
const testChildrenText = "children text test";

describe("InfoSidebar", () => {
  test("renders title and children properly", () => {
    const { getByTestId } = render(
      <InfoSidebar title={testTitle}>
        <>{testChildrenText}</>
      </InfoSidebar>,
    );

    expect(getByTestId(infoSidebarIds.toggleBtn)).toBeInTheDocument();
    expect(getByTestId(infoSidebarIds.infoSidebar)).toHaveTextContent(testChildrenText);
  });

  test("sets show to true", () => {
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);
    const { getByTestId } = render(
      <div>
        <InfoSidebar title={testTitle}>
          <>{testChildrenText}</>
        </InfoSidebar>
      </div>,
    );

    const button = getByTestId(infoSidebarIds.toggleBtn);
    fireEvent.click(button);

    expect(setStateMock).toHaveBeenCalledWith(true);
  });
});
