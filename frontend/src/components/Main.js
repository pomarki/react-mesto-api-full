import React from "react";
import Card from "../components/Card";
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  userEmail,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  function signOut() {
    localStorage.removeItem("jwt");
    history.push("/sing-in");
  }

  return (
    <>
      <Header userEmail={userEmail} userStatus={"Выйти"} signOut={signOut}/>
      <div className="content">
        <section className="profile page__profile">
          <div
            style={{
              backgroundImage: `url(${currentUser.avatar})`,
              backgroundColor: "red",
            }}
            className="profile__avatar"
          ></div>
          <div
            onClick={onEditAvatar}
            className="profile__avatar-change-icon"
          ></div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              className="profile__edit-button link"
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            className="profile__add-button link"
          ></button>
        </section>
        <section className="elements page__elements">
          <ul className="elements__list">
            {cards.map(({ cardId, ...card }) => (
              <Card
                key={cardId}
                {...card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                cardId={cardId}
              />
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Main;
