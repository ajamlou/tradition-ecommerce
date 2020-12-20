import React from "react";
import "./default.scss";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout>
              <Homepage />
            </MainLayout>
          )}
        />
        <Route
          path="/about"
          render={() => (
            <MainLayout>
              <About />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
