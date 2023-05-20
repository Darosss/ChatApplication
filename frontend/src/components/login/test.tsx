import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { loginFormIds, loginlementId } from "@utils/dataTestIdsList";
import { RenderRouterAndSendDataContextComponent } from "@src/tests/helpers";
import LoginForm from "./LoginForm";
import { logInSchema } from "./validationSchema";
import { ValidationError } from "yup";

describe("Login", () => {
  test("renders login component", () => {
    const { getByTestId } = render(
      <RenderRouterAndSendDataContextComponent>
        <Login />
      </RenderRouterAndSendDataContextComponent>,
    );

    expect(getByTestId(loginlementId)).toBeInTheDocument();
  });

  describe("LoginForm", () => {
    test("submits login form", async () => {
      const testUsername = "testUsername";
      const testPassword = "testPassword";
      const onSubmit = jest.fn();
      const { getByTestId } = render(
        <RenderRouterAndSendDataContextComponent>
          <LoginForm onSubmit={onSubmit} />
        </RenderRouterAndSendDataContextComponent>,
      );

      await waitFor(() => {
        const usernameInput = getByTestId(loginFormIds.usernameInput);
        const passwordInput = getByTestId(loginFormIds.passwordInput);
        const form = getByTestId(loginFormIds.form);

        fireEvent.change(usernameInput, { target: { value: testUsername } });
        fireEvent.change(passwordInput, { target: { value: testPassword } });
        fireEvent.submit(form);
      });

      expect(onSubmit).toHaveBeenCalledWith({ username: testUsername, password: testPassword });
    });
  });

  describe("Login validation schema", () => {
    test("validates a valid login form", async () => {
      const validForm = {
        username: "testuser",
        password: "password123",
      };

      const isValid = await logInSchema.isValid(validForm);

      expect(isValid).toBe(true);
    });

    test("validates an invalid login form", async () => {
      const invalidForm = {
        username: "",
        password: "",
      };

      try {
        await logInSchema.validate(invalidForm);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error instanceof ValidationError).toBe(true);
        expect((error as ValidationError).errors).toContain("Required!");
      }
    });
  });
});
