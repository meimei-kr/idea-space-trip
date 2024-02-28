import CheckTheme from "@/app/[uuid]/check-theme/page";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/elements/LinkButton/LinkButton", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/elements/BackButton/BackButton", () => ({
  __esModule: true,
  default: () => <div>BackButton</div>,
}));

describe("CheckTheme", () => {
  it("should render the sentence correctly", () => {
    render(<CheckTheme />);

    expect(
      screen.getByText("考えたいテーマは、すでに決まってる？"),
    ).toBeInTheDocument();
  });

  it("should display yes and no options", () => {
    render(<CheckTheme />);

    expect(screen.getByText("YES")).toBeInTheDocument();
    expect(screen.getByText("NO")).toBeInTheDocument();
  });

  it("should display the BackButton", () => {
    render(<CheckTheme />);

    expect(screen.getByText("BackButton")).toBeInTheDocument();
  });
});
