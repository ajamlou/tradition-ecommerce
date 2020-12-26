import React from "react";
import globalStyles from "../../globalStyles";
import Button from "./../forms/Button";

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <Button
      style={{
        backgroundColor: "white",
        borderRadius: 0,
        borderWidth: 10,
        borderColor: "red",
        color: globalStyles.secondary,
        width: 250,
      }}
      onClick={() => onLoadMoreEvt()}
    >
      Ladda fler produkter
    </Button>
  );
};

export default LoadMore;
