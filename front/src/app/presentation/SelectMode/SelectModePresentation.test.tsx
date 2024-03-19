import { SelectModePresentation } from "@/app/presentation/SelectMode/SelectModePresentation";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";

jest.mock("@/components/elements/LinkButton/LinkButton", () => ({
  __esModule: true, // ESモジュールとしてモックを扱うために必要
  default: (props: PropsWithChildren) => (
    <div data-testid="linkButton">{props.children}</div>
  ),
}));

jest.mock("@/components/elements/Button/Button", () => ({
  __esModule: true, // ESモジュールとしてモックを扱うために必要
  default: (props: PropsWithChildren) => (
    <div data-testid="button">{props.children}</div>
  ),
}));

jest.mock("next/navigation");
jest.mock("@/lib/idea-sessions");

describe("SelectMode", () => {
  it("renders the correct text content", () => {
    render(<SelectModePresentation />);
    expect(screen.getByText("アイデア出し")).toBeInTheDocument();
    expect(screen.getByText("スタート")).toBeInTheDocument();
    expect(screen.getByText("アイデアメモ")).toBeInTheDocument();
  });

  it("should render two LinkButton components", () => {
    render(<SelectModePresentation />);
    const linkButton = screen.getByTestId("linkButton");
    const button = screen.getByTestId("button");

    // LinkButton, Buttonコンポーネントがレンダリングされることを確認
    expect(linkButton).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
