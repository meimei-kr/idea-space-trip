import CheckThemePresentation from "@/app/presentation/CheckTheme/CheckThemePresentation";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/elements/Button/Button", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

jest.mock("@/components/elements/BackButton/BackButton", () => ({
  __esModule: true,
  default: () => <div>BackButton</div>,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/uuid/test",
  useRouter: () => ({
    prefetch: jest.fn(),
    push: jest.fn(),
  }),
}));

const ideaSession = {
  uuid: "uuid",
};

describe("CheckThemePresentation", () => {
  it("should render the sentence correctly", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(
      screen.getByText("考えたいテーマは、すでに決まってる？"),
    ).toBeInTheDocument();
  });

  it("should display yes and no options", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByText("YES")).toBeInTheDocument();
    expect(screen.getByText("NO")).toBeInTheDocument();
  });

  it("should display the BackButton", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByText("BackButton")).toBeInTheDocument();
  });
});
