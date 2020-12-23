import React from "react";
import "./styles.scss";
import Header from "./../../assets/subheader.png";

const Subheader = ({ title }) => {
  return (
    <div
      className="subHeader"
      style={{
        backgroundImage: `url(${Header})`,
      }}
    >
      <h1 style={{ textAlign: "center", color: "white" }}>{title}</h1>
    </div>
  );
};

export default Subheader;
