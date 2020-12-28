import React, { useEffect, useState } from "react";
import FormInput from "../forms/FormInput";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpUserStart,
  resetErrorMessages,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { Link, useHistory } from "react-router-dom";
import globalStyles from "../../globalStyles";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUp = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const REGISTER = "Registrera";

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/products");
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
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };

  const goBack = () => {
    dispatch(resetErrorMessages());
  };

  const configAuthWrapper = {
    headline: "Skapa konto",
    text: "Skapa ett konto om du vill kunna se dina ordar och få nyhetsbrev",
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
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="För- och efternamn"
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput
            type="text"
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
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Bekräfta lösenord"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit">
            {loading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              REGISTER
            )}
          </Button>
          <div className="links">
            <Link
              to="/login"
              onClick={() => goBack()}
              style={{ color: globalStyles.secondary }}
            >
              Tillbaka
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
