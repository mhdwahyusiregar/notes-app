import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <form onSubmit={this.onSubmitHandler} className="input-login">
              <input
                type="email"
                placeholder={locale === "id" ? "Email" : "Email"}
                value={this.state.email}
                onChange={this.onEmailChangeHandler}
              />
              <input
                type="password"
                placeholder={locale === "id" ? "Kata Sandi" : "Password"}
                value={this.state.password}
                onChange={this.onPasswordChangeHandler}
              />
              <button>Masuk</button>
            </form>
          );
        }}
      </LocaleConsumer>
    );
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
