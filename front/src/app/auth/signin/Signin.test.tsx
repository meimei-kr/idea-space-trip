import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Signin from "@/app/auth/signin/page";

describe("Signin", () => {
  it("should render the sign in page", () => {
    render(<Signin />);
    // タイトルが正しく表示されているかを検証
    expect(screen.getByText("Sign In")).toBeInTheDocument();

    // Google サインインボタンが存在するかを検証
    expect(
      screen.getByRole("button", { name: "Sign in with Google" }),
    ).toBeInTheDocument();

    // 利用規約とプライバシーポリシーへのリンクが存在するかを検証
    expect(screen.getByText("利用規約")).toHaveAttribute("href", "/terms");
    expect(screen.getByText("プライバシーポリシー")).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
});
