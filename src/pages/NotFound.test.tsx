import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("Not Found", () => {
  test("Not Found text displayed", () => {
    render(<NotFound />);
    const text = screen.getByText("Not found");
    expect(text).toBeInTheDocument();
  });

  test("Please make sure text displayed", () => {
    render(<NotFound />);
    const text = screen.getByText("Please make sure", { exact: false });
    expect(text).toBeInTheDocument();
  });
});
