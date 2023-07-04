import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  const [error, setError] = useState(null);

  async function onLogin({ email, password }) {
    const response = await login({ email, password });

    if (response.error) {
      setError(response.error);
    } else {
      loginSuccess(response.data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="login-page">
            <h2>
              {locale === "id"
                ? "Silakan masuk untuk melanjutkan ..."
                : "Please login to continue..."}
            </h2>
            {error && <p>{error}</p>}
            <LoginInput login={onLogin} />
            <p>
              Belum punya akun? <Link to="/register">Daftar di sini.</Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
