import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
  signInError: user.signInError,
});

const SignIn = (props) => {
  const { signInSuccess, signInError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const LOGIN = "Logga in";

  useEffect(() => {
    if (signInSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push("/");
      resetForm();
    }
  }, [signInSuccess, props.history, dispatch]);

  useEffect(() => {
    if (Array.isArray(signInError) && signInError.length > 0) {
      setErrors(signInError);
      setLoading(false);
    }
  }, [signInError]);

  const resetForm = () => {
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
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
              <Button onClick={handleGoogleSignIn}>Logga in med Google</Button>
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
