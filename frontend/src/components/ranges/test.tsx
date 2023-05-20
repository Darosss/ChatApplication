import React from "react";
import { render } from "@testing-library/react";
import Ranges from "./Ranges";
import { RenderRouterAndSendDataContextComponent, axiosResponseDefaultData } from "@src/tests/helpers";

import { rangesElementId } from "@utils/dataTestIdsList";

const useGetRanges = "useGetRanges";
import * as rangesHooks from "@hooks/rangesApi";
import { getRangeData, getUserData } from "@src/tests/testData";
const sendData = jest.fn();

describe("Ranges", () => {
  test("renders Ranges component properly without data", () => {
    const rangesFn = jest.fn();
    jest.spyOn(rangesHooks, useGetRanges).mockImplementation(() => ({
      rangesResponse: undefined,
      rangesLoading: false,
      rangesError: undefined,
      refetchRanges: rangesFn,
    }));

    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Ranges />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(rangesElementId)).toBeInTheDocument();
  });

  test("renders Ranges component properly with range names and creators", () => {
    const userData = getUserData();
    const rangesData = [getRangeData(userData), getRangeData(userData)];
    const sendData = jest.fn();
    const rangesFn = jest.fn();
    jest.spyOn(rangesHooks, useGetRanges).mockImplementation(() => ({
      rangesResponse: { data: { ranges: rangesData }, status: 200, ...axiosResponseDefaultData },
      rangesLoading: false,
      rangesError: undefined,
      refetchRanges: rangesFn,
    }));

    const { getByText, getAllByText } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Ranges />
      </RenderRouterAndSendDataContextComponent>,
    );

    rangesData.forEach((range) => {
      expect(getByText(new RegExp(range.name, "i"))).toBeInTheDocument();
      expect(getAllByText(new RegExp(range.createdBy.username, "i")).length).toBeGreaterThanOrEqual(1);
    });
  });
});
