import React from "react";
import "./styles.scss";

const InvertedButton = ({ children, ...otherProps }) => {
  return (
    <button className="invBtn" {...otherProps}>
      {children}
    </button>
  );
};

export default InvertedButton;
