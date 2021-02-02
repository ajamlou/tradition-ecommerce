import { PlayCircleFilledWhite } from "@material-ui/icons";
import React from "react";
import globalStyles from "../../globalStyles";
import InvertedButton from "./../forms/InvertedButton";

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return (
    <InvertedButton
      // className="loadMoreBtn"
      style={{
        color: globalStyles.secondary,
        width: 300,
        borderColor: "white",
        borderBottom: "3px solid #474747",
      }}
      onClick={() => onLoadMoreEvt()}
    >
      Ladda fler produkter
    </InvertedButton>
  );
};

export default LoadMore;
