import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import Logo from "./../../assets/header_logo.png";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="EREE LOGO" />
          </Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to={"/about"}>Om</Link>
              </li>
              <li>
                <Link to={"/dashboard"}>Mitt konto</Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>Logga ut</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to={"/about"}>Om</Link>
              </li>
              <li>
                <Link to={"/login"}>Logga in</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
