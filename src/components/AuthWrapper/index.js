import React from "react";
import "./styles.scss";

const AuthWrapper = ({ headline, text, children }) => {
  return (
    <div className="authWrapper">
      <div className="wrap">
        {headline && <h2>{headline}</h2>}
        {text && <p>{text}</p>}
        <div className="children">{children && children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
