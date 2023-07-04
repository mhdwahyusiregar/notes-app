import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import { LocaleConsumer } from "../contexts/LocaleContext";

function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function onRegisterHandler(user) {
    const response = await register(user);
    if (response.error) {
      setError(response.error);
    } else {
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="register-page">
            <h2>
              {locale === "id"
                ? "Isi form untuk mendaftar akun."
                : "Fill in the form to register an account."}
            </h2>
            {error && <p>{error}</p>}
            <RegisterInput register={onRegisterHandler} />
            <p>
              Kembali ke <Link to="/">Masuk</Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
