import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordStart,
  resetUserState,
  resetErrorMessages,
} from "./../../redux/User/user.actions";
import { useHistory, Link } from "react-router-dom";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const SUBMIT = "Återställ";

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
      resetForm();
    }
  }, [resetPasswordSuccess, dispatch, history]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
      setLoading(false);
    }
  }, [userErr]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  const resetForm = () => {
    setLoading(false);
    setEmail("");
    setErrors([]);
  };

  const goBack = () => {
    dispatch(resetErrorMessages());
  };

  const configAuthWrapper = {
    headline: "Återställ lösenord",
    text:
      "Fyll i din emailadress nedan för att återställa lösenordet. Om du har ett konto hos oss kommer du att få ett mail skickat till dig med instruktioner om hur du återställer lösenordet.",
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
          <Link to="/login" onClick={() => goBack()}>
            Tillbaka
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default ResetPassword;
