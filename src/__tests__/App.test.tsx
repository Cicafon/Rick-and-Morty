import { render, screen } from "@testing-library/react";
import App from "../App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("App Component", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  });
  it("renders title image", () => {
    const titlePicture = screen.getByRole("img");
    expect(titlePicture).toBeInTheDocument();
  });
});
