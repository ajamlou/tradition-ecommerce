import React, { useEffect, useState } from "react";
import FormInput from "../forms/FormInput";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpUserStart,
  resetErrorMessages,
} from "./../../redux/User/user.actions";
import Button from "../forms/Button";
import Modal from "./../../components/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import AuthWrapper from "../AuthWrapper";
import { Link, useHistory } from "react-router-dom";
import globalStyles from "../../globalStyles";
import { Checkbox } from "@material-ui/core";

const TERMS =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignUp = (props) => {
  const { currentUser, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hideModal, setHideModal] = useState(true);
  const [accept, setAccept] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [acceptErrMsg, setAcceptErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const REGISTER = "Registrera";

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

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
    setAccept(false);
    setAcceptErrMsg(false);
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (accept) {
      setAcceptErrMsg(false);
      setLoading(true);
      dispatch(
        signUpUserStart({
          displayName,
          email,
          password,
          confirmPassword,
        })
      );
    } else if (!accept) {
      setAcceptErrMsg(true);
    }
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
      <Modal {...configModal}>
        <div>
          <p style={{ textAlign: "justify" }}>{TERMS}</p>
          <Button onClick={() => toggleModal()}>Stäng</Button>
        </div>
      </Modal>

      {acceptErrMsg ? (
        <ul>
          <li>Du måste acceptera villkoren för att bli medlem.</li>
        </ul>
      ) : null}

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

          <div className="terms">
            <Checkbox checked={accept} onChange={() => setAccept(!accept)} />
            <span>
              Genom att bli medlem godkänner du våra{" "}
              <span
                style={{ color: globalStyles.primary }}
                className="link"
                onClick={toggleModal}
              >
                användarvillkor
              </span>
              .
            </span>
          </div>

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
