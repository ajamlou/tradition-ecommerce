import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./default.scss";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

// layouts
import MainLayout from "./layouts/MainLayout";

// hoc
import WithAuth from "./hoc/WithAuth";
import WithAdminAuth from "./hoc/WithAdminAuth";

// pages
import Dashboard from "./pages/Dashboard";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Admin from "./pages/Admin";
import AdminToolbar from "./components/AdminToolbar";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  });

  return (
    <div className="App">
      <AdminToolbar />
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
        <Route
          path="/register"
          render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/reset"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
