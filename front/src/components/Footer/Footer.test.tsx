import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Footer from "@/components/Footer/Footer";

describe("Footer", () => {
  it("should render social media isons links", () => {
    render(<Footer />);

    const xLink = screen.getByTestId("x-link");
    expect(xLink).toHaveAttribute("href", "https://twitter.com/meimei_kr_");

    const githubLink = screen.getByTestId("github-link");
    expect(githubLink).toHaveAttribute("href", "https://github.com/meimei-kr");
  });

  it("should render logo", () => {
    render(<Footer />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render privacy policy link", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("should render terms of use link", () => {
    render(<Footer />);

    const termsLink = screen.getByRole("link", { name: "Terms of Use" });
    expect(termsLink).toHaveAttribute("href", "/terms");
  });

  it("should render contact link", () => {
    render(<Footer />);

    const contactLink = screen.getByRole("link", { name: "Contact" });
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});
