import React from "react";
import "./styles.scss";
import SignIn from "./../../components/SignIn";
import Subheader from "../../components/Subheader";

const Login = (props) => {
  return (
    <div>
      <Subheader title={"MINA ORDRAR"} />
      <SignIn />
    </div>
  );
};

export default Login;
