import React from "react";
import Wallpaper from "./../../assets/wallpaper.jpg";
import { Link } from "react-router-dom";
import "./styles.scss";

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
          <Link to="/search">Våra produkter</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
