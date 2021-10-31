import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ registerUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    registerUser(password, email);
  }

  return (
    <>
      <Header userStatus={true} />
      <div className="authorization authorization_type_visible">
        <h2 className="authorization__title">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            value={email}
            onChange={handleChangeEmail}
            className="authorization__input"
            placeholder="Email"
          />
          <input
            required
            type="password"
            value={password}
            onChange={handleChangePassword}
            className="authorization__input"
            placeholder="Пароль"
          />
          <button className="authorization__button">Зарегистрироваться</button>
        </form>
        <Link to="sing-in" className="authorization__subtitle link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
