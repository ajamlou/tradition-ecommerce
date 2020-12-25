import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import globalStyles from "../../globalStyles";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  text: {
    color: globalStyles.primary,
    fontSize: 16,
  },
});

const Header = (props) => {
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          button
          onClick={() => {
            history.push("/products");
            toggleDrawer(anchor, false);
          }}
          key={"Produkter"}
        >
          <ListItemText className={classes.text} primary={"Produkter"} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push("/dashboard");
            toggleDrawer(anchor, false);
          }}
          key={"Mitt konto"}
        >
          <ListItemText primary={"Mitt konto"} />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push("/about");
            toggleDrawer(anchor, false);
          }}
          key={"Om oss"}
        >
          <ListItemText primary={"Om oss"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Trädition LOGO" />
          </Link>
        </div>
        <div className="desktop">
          <nav>
            <ul>
              <li>
                <Link to="/products" style={{ color: globalStyles.primary }}>
                  Produkter
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: globalStyles.primary }}>
                  <div>
                    <Badge badgeContent={totalNumCartItems} color="secondary">
                      <ShoppingCartIcon
                        style={{
                          height: 25,
                          width: "auto",
                          color: globalStyles.primary,
                        }}
                      />
                    </Badge>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="callToActions">
            <ul>
              {currentUser && [
                <li key={1}>
                  <Link to="/about" style={{ color: globalStyles.primary }}>
                    Om oss
                  </Link>
                </li>,
                <li key={2}>
                  <Link to="/dashboard" style={{ color: globalStyles.primary }}>
                    Mitt konto
                  </Link>
                </li>,
              ]}

              {!currentUser && [
                <li key={1}>
                  <Link to="/about" style={{ color: globalStyles.primary }}>
                    Om oss
                  </Link>
                </li>,
                <li key={2}>
                  <Link to="/login" style={{ color: globalStyles.primary }}>
                    Logga in
                  </Link>
                </li>,
              ]}
            </ul>
          </div>
        </div>
        <div className="mobile-menu">
          <div className="mobile-cart">
            <Link to="/cart" style={{ color: globalStyles.primary }}>
              <div>
                <Badge badgeContent={totalNumCartItems} color="secondary">
                  <ShoppingCartIcon
                    style={{
                      height: 25,
                      width: "auto",
                      color: globalStyles.primary,
                    }}
                  />
                </Badge>
              </div>
            </Link>
          </div>
          <div className="menu">
            <MenuIcon
              className="menu-icon"
              onClick={toggleDrawer("right", true)}
              style={{
                height: 25,
                width: "auto",
                color: globalStyles.primary,
              }}
            />
            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
