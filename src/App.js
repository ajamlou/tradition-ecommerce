import React from "react";
import "./default.scss";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
