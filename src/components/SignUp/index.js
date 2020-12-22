import React, { useEffect, useState } from "react";
import FormInput from "../forms/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, resetAllAuthForms } from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const SignUp = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const REGISTER = "Registrera";

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(resetAllAuthForms());
      resetForm();
      props.history.push("/");
    }
  }, [signUpSuccess, props.history, dispatch]);

  useEffect(() => {
    console.log(signUpError);
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
      setLoading(false);
    }
  }, [signUpError]);

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
      signUpUser({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
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
            <Link to="/login">Tillbaka</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignUp);
