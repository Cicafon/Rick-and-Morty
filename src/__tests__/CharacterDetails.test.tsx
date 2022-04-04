import { Router } from "react-router-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import CharacterDetails from "../pages/CharacterDetails";
import { createMemoryHistory } from "history";
import { setupServer } from "msw/node";
import { DefaultRequestBody, rest } from "msw";

const dummy_data = {
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
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    characterId: "1",
  }),
}));

const server = setupServer(
  rest.get<DefaultRequestBody, any>(
    `${process.env.REACT_APP_URL}/1`,
    (req, res, ctx) => {
      return res(ctx.json(dummy_data));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Character Details Component", () => {
  describe("With success character data", () => {
    beforeEach(async () => {
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <CharacterDetails />
        </Router>
      );
      await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    });
    it("renders image", () => {
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });
    it("renders name", () => {
      const name = screen.getByText("Rick Sanchez");
      expect(name).toBeInTheDocument();
    });
    it("renders status", () => {
      const text = screen.getByText("Alive");
      expect(text).toBeInTheDocument();
    });
    it("renders species", () => {
      const text = screen.getByText("Human");
      expect(text).toBeInTheDocument();
    });
    it("renders gender", () => {
      const text = screen.getByText("Male");
      expect(text).toBeInTheDocument();
    });
    it("renders origin", () => {
      const text = screen.getByText("Earth (C-137)");
      expect(text).toBeInTheDocument();
    });
    it("renders last known location", () => {
      const text = screen.getByText("Citadel of Ricks");
      expect(text).toBeInTheDocument();
    });
    it("renders number of apperance", () => {
      const text = screen.getByText("2");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Without character data", () => {
    it("if Character Id not found show not found text", async () => {
      server.use(
        rest.get(`${process.env.REACT_APP_URL}/1`, (req, res, ctx) => {
          return res.once(
            ctx.status(404),
            ctx.json({ message: "Error: cannot fetch single character" })
          );
        })
      );
      const history = createMemoryHistory();
      render(
        <Router history={history}>
          <CharacterDetails />
        </Router>
      );
      await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
      const text = await screen.findByText("Character with this ID not found", {
        exact: false,
      });
      expect(text).toBeInTheDocument();
    });
  });
});
