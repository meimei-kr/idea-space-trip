import InputThemePresentation from "@/app/presentation/InputTheme/InputThemePresentation";
import { IdeaSessionType } from "@/types";
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useUUIDCheck", () => ({
  useUUIDCheck: () => ({
    uuid: "uuid",
    statusCode: 200,
  }),
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: jest.fn(() => [{ errors: {} }, jest.fn()]),
  useFormStatus: jest.fn().mockReturnValue({ pending: false }),
}));

jest.mock("@/components/ui/textarea", () => ({
  Textarea: () => <textarea name="theme" aria-label="theme" />,
}));

const ideaSession: IdeaSessionType = {
  uuid: "uuid",
  isThemeDetermined: true,
};

describe("InputThemePresentation", () => {
  it("should render the instruction correctly", () => {
    render(<InputThemePresentation ideaSession={ideaSession} />);

    expect(
      screen.getByText("アイデア出しのテーマを入力してね"),
    ).toBeInTheDocument();
  });

  it("should display the textarea", () => {
    render(<InputThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByRole("textbox", { name: "theme" })).toBeInTheDocument();
  });

  it("should render the checkItem correctly", () => {
    render(<InputThemePresentation ideaSession={ideaSession} />);

    expect(
      screen.getByText("テーマが具体的かどうかチェック"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("check")).toBeInTheDocument();
  });

  it("should display the submit button", () => {
    render(<InputThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByRole("button", { name: "決定" })).toBeInTheDocument();
  });

  it("should display the BackButton", () => {
    render(<InputThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByText("BACK")).toBeInTheDocument();
  });
});
