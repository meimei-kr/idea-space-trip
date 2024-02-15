import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "@/components/Header/Header";
import { signOut, useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("Header", () => {
  it("should render login link when user is not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({ status: "unauthenticated" });

    render(<Header />);

    const hamburger = screen.getByTestId("hamburger");
    userEvent.click(hamburger);

    const loginLink = screen.getByRole("link", { name: "LOGIN ログイン" });
    expect(loginLink).toBeInTheDocument();
  });

  it("should render logout and other member's link when user is authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({ status: "authenticated" });

    render(<Header />);

    const hamburger = screen.getByTestId("hamburger");
    userEvent.click(hamburger);

    const logoutLink = screen.getByRole("link", { name: "LOGOUT ログアウト" });
    expect(logoutLink).toBeInTheDocument();

    const brainstormLink = screen.getByRole("link", {
      name: "BRAINSTORM アイデア出しセッション",
    });
    expect(brainstormLink).toBeInTheDocument();

    const memoLink = screen.getByRole("link", {
      name: "MEMO 保存したアイデアを確認",
    });
    expect(memoLink).toBeInTheDocument();

    const settingsLink = screen.getByRole("link", {
      name: "SETTINGS 登録情報設定",
    });
    expect(settingsLink).toBeInTheDocument();
  });

  it("should call signOut function when logout link is clicked", async () => {
    (useSession as jest.Mock).mockReturnValue({ status: "authenticated" });
    (signOut as jest.Mock).mockResolvedValueOnce(Promise.resolve());

    render(<Header />);

    const hamburger = screen.getByTestId("hamburger");
    userEvent.click(hamburger);

    const logoutLink = screen.getByRole("link", { name: "LOGOUT ログアウト" });
    await userEvent.click(logoutLink);

    expect(signOut).toHaveBeenCalled();
  });
});
