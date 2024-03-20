import LinkButton from "@/components/elements/LinkButton/LinkButton";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/link", () => ({
  __esModule: true,
  default: function Link({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return <a href={href}>{children}</a>;
  },
}));

describe("Button", () => {
  it("renders children prop content", () => {
    render(
      <LinkButton color="pink" size="large" href="/auth/signin">
        LOGIN
      </LinkButton>,
    );

    const button = screen.getByRole("link", { name: "LOGIN" });
    expect(button).toBeInTheDocument();
  });

  it("navigates to href url when clicked", async () => {
    render(
      <LinkButton color="pink" size="large" href="/auth/signin">
        LOGIN
      </LinkButton>,
    );

    const button = screen.getByRole("link", { name: "LOGIN" });
    userEvent.click(button);

    expect(button.getAttribute("href")).toBe("/auth/signin");
  });
});
