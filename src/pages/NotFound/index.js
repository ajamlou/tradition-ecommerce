import React from "react";
import { Link } from "react-router-dom";
import Subheader from "../../components/Subheader";
import globalStyles from "../../globalStyles";
import Logo from "./../../assets/logo.png";
import "./styles.scss";

const NotFound = (props) => {
  return (
    <div className="notFound">
      <Subheader title={"DENNA SIDA FINNS INTE"} />
      <div className="desc404">
        <h3>Hoppsan! Denna sida verkar inte finnas. </h3>

        <Link to="/products">
          <h3 className="link" style={{ color: globalStyles.primary }}>
            Gå till produkter
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
