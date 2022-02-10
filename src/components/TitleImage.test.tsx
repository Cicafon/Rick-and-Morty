import { render, screen } from "@testing-library/react";
import TitleImage from "./TitleImage";

describe("Title image", () => {
  test("title img displayed", () => {
    render(<TitleImage />)
    const titlePicture= screen.getByRole("img")
    expect(titlePicture).toBeInTheDocument()
  });
});
