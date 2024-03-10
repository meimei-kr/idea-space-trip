import RadioButtonForm from "@/components/elements/RadioButtons/RadioButtons";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("RadioButtons", () => {
  const options = [
    {
      label: "option1",
      value: "option1",
    },
    {
      label: "option2",
      value: "option2",
    },
    {
      label: "option3",
      value: "option3",
    },
  ];
  beforeEach(() => {
    render(
      <RadioButtonForm
        options={options}
        ariaDescribedby="theme-category-error"
      />,
    );
  });

  it("should render the radio buttons correctly", () => {
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });
});
