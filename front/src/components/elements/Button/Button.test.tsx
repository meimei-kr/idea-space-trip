import Button from "@/components/elements/Button/Button";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const push = jest.fn();
const prefetch = jest.fn();
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push,
      prefetch,
    }),
  };
});

describe("Button", () => {
  it("renders children prop content", () => {
    render(
      <Button color="pink" size="large" type="button">
        BUTTON
      </Button>,
    );

    const button = screen.getByRole("button", { name: "BUTTON" });
    expect(button).toBeInTheDocument();
  });

  it("navigates to href url when clicked", async () => {
    render(
      <Button color="pink" size="large" type="button" href="/auth/signin">
        LOGIN
      </Button>,
    );

    const button = screen.getByRole("button", { name: "LOGIN" });
    userEvent.click(button);

    // ボタンクリックによる状態時更新や副作用は非同期で行われるため、waitForをつける
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/auth/signin");
    });
  });

  it("submits form when clicked", async () => {
    const handleSubmit = jest.fn();

    render(
      <form onSubmit={handleSubmit}>
        <Button color="pink" size="large" type="submit">
          SUBMIT
        </Button>
      </form>,
    );

    const button = screen.getByRole("button", { name: "SUBMIT" });
    userEvent.click(button);

    // ボタンクリックによる状態時更新や副作用は非同期で行われるため、waitForをつける
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
