import SelectMode from "@/app/select-mode/page";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";

jest.mock("@/components/elements/LinkButton/LinkButton", () => ({
  __esModule: true, // ESモジュールとしてモックを扱うために必要
  default: (props: PropsWithChildren) => (
    <div data-testid="linkButton">{props.children}</div>
  ),
}));

describe("SelectMode", () => {
  it("renders the correct text content", () => {
    render(<SelectMode />);
    expect(screen.getByText("アイデア出し")).toBeInTheDocument();
    expect(screen.getByText("スタート")).toBeInTheDocument();
    expect(screen.getByText("アイデア")).toBeInTheDocument();
    expect(screen.getByText("ストックメモ")).toBeInTheDocument();
  });

  it("should render two LinkButton components", () => {
    render(<SelectMode />);
    const linkButtons = screen.getAllByTestId("linkButton");

    // LinkButtonが2つレンダリングされることを確認
    expect(linkButtons).toHaveLength(2);
  });
});
