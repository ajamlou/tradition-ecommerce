import React from "react";
import "./styles.scss";
import Header from "./../../assets/subheader.png";
import globalStyles from "../../globalStyles";

const Subheader = ({ title }) => {
  return (
    <div
      className="subHeader"
      // style={{
      //   backgroundImage: `url(${Header})`,
      // }}
    >
      <h1
        style={{
          textAlign: "center",
          color: globalStyles.primary,
          fontFamily: globalStyles.fontFamilyHeader,
          fontWeight: 600,
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default Subheader;
