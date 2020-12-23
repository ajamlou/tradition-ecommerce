import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "./../../redux/User/user.actions";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./styles.scss";

import Logo from "./../../assets/logo.png";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="EREE Woodcraft LOGO" />
          </Link>
        </div>

        {/* <nav>
          <ul>
            <li>
              <Link to="/search">Produkter</Link>
            </li>
          </ul>
        </nav> */}

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/search">Produkter</Link>
            </li>
            <li>
              <Link to="/cart">
                <ShoppingCartIcon style={{ height: 25, width: "auto" }} /> (
                {totalNumCartItems})
              </Link>
            </li>

            {currentUser && [
              <li key={1}>
                <Link to="/dashboard">Mitt konto</Link>
              </li>,
            ]}

            {!currentUser && [
              <li key={1}>
                <Link to="/login">Logga in</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
