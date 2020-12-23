import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemsCount } from "./../../redux/Cart/cart.selectors";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./styles.scss";

import Logo from "./../../assets/logo.png";
import globalStyles from "../../globalStyles";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  // const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Trädition LOGO" />
          </Link>
        </div>

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
                  <ShoppingCartIcon style={{ height: 25, width: "auto" }} /> (
                  {totalNumCartItems})
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
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
