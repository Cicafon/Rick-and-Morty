import { render, screen } from "@testing-library/react";
import NotFound from "../pages/NotFound";

describe("Not Found", () => {
  beforeEach(() => {
    render(<NotFound />);
  });
  it("Not Found text displayed", () => {
    const text = screen.getByText(/Not found/);
    expect(text).toBeInTheDocument();
  });

  it("Please make sure text displayed", () => {
    const text = screen.getByText(/Please make sure/i);
    expect(text).toBeInTheDocument();
  });
});
