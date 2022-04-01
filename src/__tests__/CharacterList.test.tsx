import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import CharacterList from "../pages/CharacterList";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { setupServer } from "msw/node";
import { DefaultRequestBody, rest } from "msw";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    page: "1",
  }),
}));

const dummy_data = {
  results: [
    {
      created: "2017-11-04T18:48:46.250Z",
      episode: ["1", "2"],
      gender: "Male",
      id: 1,
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3",
      },
      name: "Rick Sanchez",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      species: "Human",
      status: "Alive",
      type: "",
      url: "https://rickandmortyapi.com/api/character/1",
    },
  ],
};

const server = setupServer(
  rest.get<DefaultRequestBody, any>(
    `${process.env.REACT_APP_URL}`,
    (req, res, ctx) => {
      return res(ctx.json(dummy_data));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Character list", () => {
  beforeEach(async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CharacterList />
      </Router>
    );
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
  });
  it("Show pagination first page", () => {
    const pageNumber = screen.getByText("1");
    expect(pageNumber).toBeInTheDocument();
  });
  it("renders Character Name", () => {
    const name = screen.getByText(/Rick Sanchez/);
    expect(name).toBeInTheDocument();
  });
  it.todo("cannot fetch message")
});
