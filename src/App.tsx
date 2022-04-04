import "./App.css";
import TitleImage from "./components/TitleImage";
import { Switch, Route, Redirect } from "react-router-dom";
import TitlePicture from "./title-picture.png";
import React, { Suspense } from "react";

// Creating a basic routing by React Router V5.
// BrowserRouter is in index.tsx
// the navigation between the pages (pagination) is also handled by routing. it directs to the first page in default
// if the pagination number in the URL is invalid, the app redirects to page 1 --> /characters/1

const Characters = React.lazy(() => import("./pages/Characters"));
const CharacterDetails = React.lazy(() => import("./pages/CharacterDetails"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <div className="App">
      <TitleImage alt="title" src={TitlePicture} />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/characters/1" />
          </Route>
          <Route exact path="/characters">
            <Redirect to="/characters/1" />
          </Route>
          <Route path="/characters/:page">
            <Characters />
          </Route>
          <Route path="/details/:characterId">
            <CharacterDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
