import React from "react";
import { render } from "@testing-library/react";
import ChatMessage from "./ChatMessage";
import { faker } from "@faker-js/faker";

describe("ChatMessage", () => {
  test("renders ChatMessage properly with displayed message and sender name", () => {
    const message = faker.word.words();
    const sentTime = new Date();
    const sender = faker.person.firstName();
    const { getByText } = render(<ChatMessage message={message} sentTime={sentTime} sender={sender} />);

    expect(getByText(message)).toBeInTheDocument();
    expect(getByText(sender)).toBeInTheDocument();
  });
});
