import { render, screen } from "@testing-library/react";
import TitleImage from "../components/TitleImage";

describe("Title image", () => {
  it("title img displayed", () => {
    render(<TitleImage />)
    const titlePicture= screen.getByRole("img")
    expect(titlePicture).toBeInTheDocument()
  });
});
