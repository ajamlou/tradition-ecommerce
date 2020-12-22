import React, { useState } from "react";
import AuthWrapper from "../AuthWrapper";
import { withRouter, Link } from "react-router-dom";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { auth } from "./../../firebase/utils";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const SUBMIT = "Återställ";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/login",
    };

    const resetForm = () => {
      setLoading(false);
      setEmail("");
    };

    try {
      setLoading(true);
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          props.history.push("/login");
        });
      resetForm();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Återställ lösenord",
    text:
      "Fyll i din emailadress nedan för att återställa lösenordet. Om du har ett konto hos oss kommer du att få ett mail skickat till dig med instruktioner om hur du återställer lösenordet.",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">
          {loading ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            SUBMIT
          )}
        </Button>
        <div className="links">
          <Link to="/login">Tillbaka</Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(ResetPassword);
