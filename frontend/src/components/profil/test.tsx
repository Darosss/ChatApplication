import React from "react";
import { render } from "@testing-library/react";
import Profil from "./Profil";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";

import { profilElementId } from "@utils/dataTestIdsList";

describe("Profil", () => {
  test("renders Profil component properly", () => {
    const sendData = jest.fn();
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent sendData={sendData}>
        <Profil />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(profilElementId)).toBeInTheDocument();
  });
});
