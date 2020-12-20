import React from "react";
import "./styles.scss";
import Logo from "./../../assets/header_logo.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="EREE LOGO" />
          </Link>
        </div>
        <div className="callToActions">
          <ul>
            <li>
              <Link to={"/cutlery"}>Bestick</Link>
              <Link to={"/boxes"}>Lådor</Link>
              <Link to={"/jewelry"}>Smycken</Link>
              <Link to={"/about"}>About</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
