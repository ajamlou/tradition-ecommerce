import React from "react";
import "./styles.scss";
import Logo from "./../../assets/header_logo.png";

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} alt="EREE LOGO" />
        </div>
        <div>
          <a>About</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
