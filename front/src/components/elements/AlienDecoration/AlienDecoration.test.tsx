import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("AlienDecoration", () => {
  it("should render the svg correctly", () => {
    render(<AlienDecoration number={1} />);
    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });

  it("should render the number less than 10 correctly", () => {
    render(<AlienDecoration number={9} />);
    expect(screen.getByText("09")).toBeInTheDocument();
  });

  it("should render the number more than 9 correctly", () => {
    render(<AlienDecoration number={10} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
