import React, { useState } from "react";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import { auth, handleUserProfile } from "./../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const REGISTER = "Registrera";

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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password !== confirmPassword) {
      setErrors(["Lösenorden stämmer inte överens"]);
      resetForm();
      return;
    }
    if (password.length < 6) {
      setErrors(["Lösenordet måste vara längre än sex tecken"]);
      resetForm();
      return;
    }
    if (!re.test(String(email).toLowerCase())) {
      setErrors(["Du måste ange en giltig mailadress"]);
      resetForm();
    }

    try {
      setLoading(true);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      props.history.push("/");
      resetForm();
    } catch (err) {
      console.log(err);
    }
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
