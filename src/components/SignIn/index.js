import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "../forms/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import { signInWithGoogle, auth } from "./../../firebase/utils";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const LOGIN = "Logga in";

  const resetForm = () => {
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      props.history.push("/");
      resetForm();
    } catch (err) {
      setErrors(["Fel lösenord och/eller emailadress"]);
      setLoading(false);
      console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: "Logga in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => {
            return <li key={index}>{err}</li>;
          })}
        </ul>
      )}
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Lösenord"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">
            {loading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              LOGIN
            )}
          </Button>
          <div className="socialSignIn">
            <div className="row">
              <Button onClick={signInWithGoogle}>Logga in med Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/reset">Glömt lösenord?</Link>
          </div>
          <div className="create">
            <h3>Har du inte ett konto?</h3>
            <Link to="/register">Skapa konto</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
