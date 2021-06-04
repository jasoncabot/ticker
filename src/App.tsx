import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { AuthDropDown, PlaceDetails, PlaceList } from './components';

export default function App() {
  const [visitedPlaceIdentifiers, setVisitedPlaceIdentifiers] = useState(new Set() as Set<number>);

  const updateVisitedList = (id: number) => {
    const updated = new Set(visitedPlaceIdentifiers);
    if (visitedPlaceIdentifiers.has(id)) {
      updated.delete(id);
      setVisitedPlaceIdentifiers(updated);
    } else {
      setVisitedPlaceIdentifiers(updated.add(id));
    }
  }

  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="/">Ticker</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <AuthDropDown />
              </ul>
            </div>
          </nav>
        </header>
        <Switch>
          <Route path="/places/:id" component={PlaceDetails} />
          <Route path="/">
            <PlaceList visited={visitedPlaceIdentifiers} onPlaceToggled={updateVisitedList} />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}
