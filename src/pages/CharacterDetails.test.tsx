import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import CharacterDetails from "./CharacterDetails";
import { createMemoryHistory } from "history";

describe("Character details", () => {
  test("if Character Id not found show not found text", async () => {
    const history = createMemoryHistory();
    const route = `/details/123456`;
    history.push(route);
    render(
      <Router history={history}>
        <CharacterDetails />
      </Router>
    );
    const text = await screen.findByText("Character with this ID not found", {
      exact: false,
    });
    expect(text).toBeInTheDocument();
  });
});
