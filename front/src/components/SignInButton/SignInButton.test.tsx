import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignInButton from "@/components/SignInButton/SignInButton";
import { signIn } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  // signIn 関数を Jest のモック関数 (jest.fn()) に置き換え
  // signIn 関数はログインに成功すると、Promise を返す
  signIn: jest.fn().mockResolvedValue(true),
}));

describe("SignInButton", () => {
  it("should render Google sign-in button correctly", () => {
    render(<SignInButton provider="google" />);
    expect(
      screen.getByRole("button", { name: "Sign in with Google" }),
    ).toBeInTheDocument();
  });

  it("should render guest sign-in button correctly", () => {
    render(<SignInButton provider="credentials" />);
    expect(
      screen.getByRole("button", { name: "Sign in as Guest" }),
    ).toBeInTheDocument();
  });

  it("should call signIn function when Google sign-in button is clicked", async () => {
    render(<SignInButton provider="google" />);
    const button = screen.getByRole("button", { name: "Sign in with Google" });
    await userEvent.click(button); // ログイン処理が終わるのを待ってから次の処理を実行
    expect(signIn).toHaveBeenCalledWith("google"); // signIn関数が引数 "google" で呼び出されたかどうかを検証
  });

  it("should call signIn function when Guest sign-in button is clicked", async () => {
    render(<SignInButton provider="credentials" />);
    const button = screen.getByRole("button", { name: "Sign in as Guest" });
    await userEvent.click(button); // ログイン処理が終わるのを待ってから次の処理を実行
    expect(signIn).toHaveBeenCalledWith("credentials"); // signIn関数が引数 "credentials" で呼び出されたかどうかを検証
  });
});
