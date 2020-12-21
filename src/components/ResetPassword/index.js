import React, { Component } from "react";
import AuthWrapper from "../AuthWrapper";
import { withRouter, Link } from "react-router-dom";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";
import { auth } from "./../../firebase/utils";

const initialState = {
  email: "",
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    const config = {
      url: "http://localhost:3000/login",
    };

    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          this.props.history.push("/login");
        });
      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email } = this.state;
    const configAuthWrapper = {
      headline: "Återställ lösenord",
      text:
        "Fyll i din emailadress nedan för att återställa lösenordet. Om du har ett konto hos oss kommer du att få ett mail skickat till dig med instruktioner om hur du återställer lösenordet.",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <Button type="submit">Återställ</Button>
          <div className="links">
            <Link to="/login">Tillbaka</Link>
          </div>
        </form>
      </AuthWrapper>
    );
  }
}

export default withRouter(ResetPassword);
