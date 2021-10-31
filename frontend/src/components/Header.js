import React from "react";
import { Link } from "react-router-dom";

function Header({ userStatus, userEmail, signOut }) {
  let statusButtonName ="";
  let statusUserLink = "sing-in";

  if (userStatus !== "Выйти") {
    statusButtonName = userStatus ? "Войти" : "Регистрация";
    statusUserLink = userStatus ? "sing-in" : "sing-up";
  } else {
    statusButtonName = "Выйти"
  }


  return (
    <header className="header page__header">
      <div className="header__logo"></div>
      <div className="header__profile-container">
        <p className="header__user-email">{userEmail}</p>
        <Link to={statusUserLink} className="header__user-status link" onClick={signOut}>
          {statusButtonName}
        </Link>
      </div>
    </header>
  );
}
export default Header;
