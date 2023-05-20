import React from "react";
import { render } from "@testing-library/react";
import ChatMessages from "./ChatMessages";
import { MessageSocket } from "../socket";
import { IMessagesRes } from "@src/@types/types";
import { getMessageData, getMessageSocketData } from "@src/tests/testData";

describe("ChatMessage", () => {
  test("renders ChatMessages properly displayed messages from local state", () => {
    const localMessages: MessageSocket[] = [getMessageSocketData(), getMessageSocketData()];

    const { getByText } = render(<ChatMessages localMessages={localMessages} dbMessages={[]} />);

    localMessages.forEach((message) => {
      expect(getByText(message.message)).toBeInTheDocument();
    });
  });
  test("renders ChatMessages properly with displayed messages from database", () => {
    const dbMessages: IMessagesRes[] = [getMessageData(), getMessageData()];

    const { getByText } = render(<ChatMessages localMessages={[]} dbMessages={dbMessages} />);

    dbMessages.forEach((message) => {
      expect(getByText(message.message)).toBeInTheDocument();
    });
  });
});
