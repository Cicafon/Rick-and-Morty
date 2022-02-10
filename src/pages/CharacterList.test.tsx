import { render, screen } from "@testing-library/react";
import CharacterList from "./CharacterList";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Character list", () => {
  test("Show pagination first page", async () => {
    const history = createMemoryHistory();
    const route = `/characters/1`;
    history.push(route);
    render(
      <Router history={history}>
        <CharacterList />
      </Router>
    );
    const pageNumber = await screen.findByText("1");
    expect(pageNumber).toBeInTheDocument();
  });
});
