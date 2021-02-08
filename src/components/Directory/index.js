import React from "react";
import Wallpaper from "./../../assets/wallpaper.jpg";
import { Link } from "react-router-dom";
import "./styles.scss";
import globalStyles from "../../globalStyles";
import Button from "./../forms/Button";

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
          <div className="text">
            <h1
              style={{
                color: "white",
                zIndex: 5,
              }}
            >
              Traditionella slöjdtekniker bevarade i modern tid.
            </h1>
            <h1
              style={{
                color: "white",
                zIndex: 5,
              }}
            >
              Välkommen till Trädition
            </h1>
          </div>

          <Link to="/products" style={{ color: globalStyles.primary }}>
            <Button>Till våra produkter</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
