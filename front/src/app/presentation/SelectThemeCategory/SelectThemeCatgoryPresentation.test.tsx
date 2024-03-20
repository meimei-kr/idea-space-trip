import SelectThemeCategoryPresentation from "@/app/presentation/SelectThemeCategory/SelectThemeCategoryPresentation";
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

const ideaSession: IdeaSessionType = {
  uuid: "uuid",
  isThemeDetermined: false,
};

describe("SelectThemeCategoryPresentation", () => {
  it("should render question correctly", () => {
    render(<SelectThemeCategoryPresentation ideaSession={ideaSession} />);
    expect(screen.getByText("どの発明家になってみる？")).toBeInTheDocument();
  });

  it("should render a form with 3 radio buttons", () => {
    render(<SelectThemeCategoryPresentation ideaSession={ideaSession} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "決定" })).toBeInTheDocument();
  });

  it("should display the BackButton", () => {
    render(<SelectThemeCategoryPresentation ideaSession={ideaSession} />);

    expect(screen.getByText("もどる")).toBeInTheDocument();
  });
});
