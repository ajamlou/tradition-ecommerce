import React from "react";
import Subheader from "../../components/Subheader";
import Signup from "./../../components/Signup";
import "./styles.scss";

const Registration = (props) => {
  return (
    <div>
      <Subheader title={"MINA ORDRAR"} />
      <Signup />
    </div>
  );
};

export default Registration;
