import React from "react";
import LeftImg from "./../../assets/left.png";
import RightImg from "./../../assets/right.png";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{
            backgroundImage: `url(${LeftImg})`,
          }}
        >
          <a>Shop</a>
        </div>
        <div
          className="item"
          style={{
            backgroundImage: `url(${RightImg})`,
          }}
        >
          <a>About us</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
