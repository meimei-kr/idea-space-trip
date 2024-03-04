import CheckThemePresentation from "@/app/presentation/InputTheme/InputThemePresentation";
import { render, screen } from "@testing-library/react";

const ideaSession = {
  uuid: "uuid",
};

describe("InputThemePresentation", () => {
  it("should render the instruction correctly", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(
      screen.getByRole("paragraph", {
        name: "アイデア出しのテーマを入力してね",
      }),
    ).toBeInTheDocument();
  });

  it("should display the textarea", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByRole("textbox", { name: "theme" })).toBeInTheDocument();
  });

  it("should render the checkItem correctly", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(
      screen.getByRole("paragraph", {
        name: "テーマが具体的かどうかチェック",
      }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("check")).toBeInTheDocument();
  });

  it("should display the submit button", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByRole("button", { name: "決定" })).toBeInTheDocument();
  });

  it("should display the BackButton", () => {
    render(<CheckThemePresentation ideaSession={ideaSession} />);

    expect(screen.getByText("BACK")).toBeInTheDocument();
  });
});
