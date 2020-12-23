import React from "react";
import globalStyles from "../../globalStyles";
import Button from "./../forms/Button";

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <Button
      style={{ backgroundColor: "white", color: globalStyles.secondary }}
      onClick={() => onLoadMoreEvt()}
    >
      Ladda fler produkter
    </Button>
  );
};

export default LoadMore;
