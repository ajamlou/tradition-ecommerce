import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../forms/Button";
import "./styles.scss";
import { signInWithGoogle, auth } from "./../../firebase/utils";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
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
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: "Logga in",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Lösenord"
              handleChange={this.handleChange}
            />
            <Button type="submit">Logga in</Button>
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
  }
}

export default SignIn;
