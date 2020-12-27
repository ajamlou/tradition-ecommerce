import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
  resetErrorMessages,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import globalStyles from "../../globalStyles";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const LOGIN = "Logga in";

  useEffect(() => {
    if (currentUser) {
      history.push("/products");
      resetForm();
    }
  }, [currentUser, history]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
      setLoading(false);
    }
  }, [userErr]);

  const resetForm = () => {
    setLoading(false);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const resetErrors = () => {
    dispatch(resetErrorMessages());
  };

  const configAuthWrapper = {
    headline: "Logga in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <p>Du måste vara inloggad för att kunna se dina ordrar.</p>
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
            <Link
              to="/reset"
              onClick={() => resetErrors()}
              style={{ color: globalStyles.secondary }}
            >
              Glömt lösenord?
            </Link>
          </div>
          <div className="create">
            <h2>Har du inte ett konto?</h2>
            <Link
              to="/register"
              onClick={() => resetErrors()}
              style={{ color: globalStyles.secondary }}
            >
              Skapa konto
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
