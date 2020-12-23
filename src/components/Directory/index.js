import React from "react";
import Wallpaper from "./../../assets/wallpaper.jpg";
import { Link } from "react-router-dom";
import "./styles.scss";
import globalStyles from "../../globalStyles";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${Wallpaper})`,
          }}
        >
          <h1
            style={{
              color: "white",
              zIndex: 5,
            }}
          >
            Välkommen till Trädition
          </h1>
          <Link to="/products" style={{ color: globalStyles.primary }}>
            Våra produkter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
