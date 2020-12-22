import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  resetAllAuthForms,
} from "./../../redux/User/user.actions";
import { withRouter, Link } from "react-router-dom";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const ResetPassword = (props) => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const SUBMIT = "Återställ";

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push("/login");
      resetForm();
    }
  }, [resetPasswordSuccess, props.history, dispatch]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
      setLoading(false);
    }
  }, [resetPasswordError]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  const resetForm = () => {
    setLoading(false);
    setEmail("");
    setErrors([]);
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
          <Link to="/login" onClick={() => resetForm()}>
            Tillbaka
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(ResetPassword);
