import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/User/user.actions";

// components
import AdminToolbar from "./components/AdminToolbar";

// hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import AdminLayout from "./layouts/AdminLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// pages
import Homepage from "./pages/Homepage";
import Cookies from "./pages/Cookies";
import Search from "./pages/Search";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Order from "./pages/Order";
import OrderConfirmed from "./pages/OrderConfirmed";
import "./default.scss";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <AdminToolbar />
      <ScrollToTop>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            exact
            path="/products"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
          />
          <Route
            path="/products/:filterType"
            render={() => (
              <MainLayout>
                <Search />
              </MainLayout>
            )}
          />
          <Route
            path="/product/:productID"
            render={() => (
              <MainLayout>
                <ProductDetails />
              </MainLayout>
            )}
          />
          <Route
            path="/cart"
            render={() => (
              <MainLayout>
                <Cart />
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
            path="/payment"
            render={() => (
              <MainLayout>
                <Payment />
              </MainLayout>
            )}
          />
          <Route
            path="/register"
            render={() => (
              <MainLayout>
                <Registration />
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
            path="/order/:orderID"
            render={() => (
              <WithAuth>
                <MainLayout>
                  <Order />
                </MainLayout>
              </WithAuth>
            )}
          />
          <Route
            path="/orderConfirmed/:orderID"
            render={() => (
              <MainLayout>
                <OrderConfirmed />
              </MainLayout>
            )}
          />
          <Route
            path="/cookies"
            render={() => (
              <MainLayout>
                <Cookies />
              </MainLayout>
            )}
          />
          <Route
            path="/admin"
            render={() => (
              <WithAdminAuth>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </WithAdminAuth>
            )}
          />
          <MainLayout>
            <Route component={NotFound} />
          </MainLayout>
        </Switch>
      </ScrollToTop>
    </div>
  );
};

export default App;
