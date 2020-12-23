import { withTheme } from "@material-ui/core";
import React from "react";
import Button from "./../forms/Button";

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <Button
      style={{ backgroundColor: "white", color: "black" }}
      onClick={() => onLoadMoreEvt()}
    >
      Ladda fler
    </Button>
  );
};

export default LoadMore;
