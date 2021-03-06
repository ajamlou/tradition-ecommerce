import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CookieConsent from "react-cookie-consent";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import globalStyles from "../../globalStyles";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  text: {
    color: globalStyles.primary,
    fontSize: 18,
    fontFamily: globalStyles.fontFamily,
  },
  customBadge: {
    backgroundColor: globalStyles.tertiary,
    color: "white",
    fontSize: 10,
  },
});

const Header = (props) => {
  const { totalNumCartItems } = useSelector(mapState);
  const history = useHistory();
  const [isFrontPage, setIsFrontPage] = useState(false);
  const classes = useStyles();
  const [state, setState] = useState({ right: false });

  useEffect(() => {
    if (window.location.pathname == "/") {
      setIsFrontPage(true);
    }
  }, []);

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
      <div className="drawerHeader">
        <h2 style={{ textAlign: "center", paddingTop: 20 }}>Trädition</h2>

        {/* <CloseIcon
          button
          style={{
            height: 24,
            width: "auto",
            color: globalStyles.primary,
          }}
          onClick={() => {
            toggleDrawer(anchor, false);
          }}
        /> */}
      </div>
      <List>
        <ListItem
          button
          onClick={() => {
            history.push("/products");
            toggleDrawer(anchor, false);
          }}
          key={"Produkter"}
        >
          <ListItemText
            classes={{ primary: classes.text }}
            primary={"Produkter"}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push("/about");
            toggleDrawer(anchor, false);
          }}
          key={"Om Trädition"}
        >
          <ListItemText
            classes={{ primary: classes.text }}
            primary={"Om Trädition"}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push("/dashboard");
            toggleDrawer(anchor, false);
          }}
          key={"Mina ordrar"}
        >
          <ListItemText
            classes={{ primary: classes.text }}
            primary={"Mina ordrar"}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {isFrontPage ? null : (
        <header className="header">
          <div className="wrap">
            <div className="desktopHeader">
              <div className="logo">
                <Link to="/">
                  <img src={Logo} alt="Trädition LOGO" />
                </Link>
              </div>
              <div className="desktop">
                <ul>
                  <li>
                    <Link to="/products" style={{ fontSize: 22 }}>
                      Produkter
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" style={{ fontSize: 22 }}>
                      Om Trädition
                    </Link>
                  </li>
                  <li key={1}>
                    <Link to="/dashboard" style={{ fontSize: 22 }}>
                      Mina ordrar
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <div>
                        <Badge
                          badgeContent={totalNumCartItems}
                          classes={{ badge: classes.customBadge }}
                        >
                          <ShoppingCartIcon
                            style={{
                              height: 24,
                              width: "auto",
                              color: globalStyles.snackBar,
                            }}
                          />
                        </Badge>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mobile-menu">
              <div className="menu">
                <MenuIcon
                  className="menu-icon"
                  onClick={toggleDrawer("left", true)}
                  style={{
                    height: 24,
                    width: "auto",
                    color: globalStyles.primary,
                  }}
                />
                <Drawer
                  anchor={"left"}
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  {list("left")}
                </Drawer>
              </div>
              <div className="mobileLogo">
                <Link to="/">
                  <img src={Logo} alt="Trädition LOGO" />
                </Link>
              </div>
              <div className="mobile-cart">
                <Link to="/cart">
                  <div>
                    <Badge
                      badgeContent={totalNumCartItems}
                      classes={{ badge: classes.customBadge }}
                    >
                      <ShoppingCartIcon
                        style={{
                          height: 24,
                          width: "auto",
                          color: globalStyles.snackBar,
                        }}
                      />
                    </Badge>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </header>
      )}

      <CookieConsent
        buttonText="OK"
        style={{
          fontSize: 14,
          lineHeight: 1.5,
        }}
        buttonStyle={{
          color: globalStyles.secondary,
          borderRadius: 5,
          width: 200,
          height: 35,
          fontSize: 16,
          fontWeight: 600,
          fontFamily: globalStyles.fontFamily,
        }}
        expires={31}
      >
        Denna hemsida använder cookies för att förbättra användarupplevelsen.
        Genom att använda sidan godkänner du användandet av cookies. Du kan läsa
        mer
        <Link style={{ color: "#FFD24D" }} to="/cookies">
          {" "}
          här
        </Link>
        .
      </CookieConsent>
    </div>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
