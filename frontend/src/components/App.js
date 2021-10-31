import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import Register from "../components/Register";
import Login from "../components/Login";
import PopupWithForm from "../components/PopupWithForm";
import ImagePopup from "../components/ImagePopup";
import InfoTooltip from "../components/InfoTooltip";
import api from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import * as auth from "../utils/auth";
import { useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setStateProfile] = useState(false);
  const [isAddPlacePopupOpen, setStateAdd] = useState(false);
  const [isEditAvatarPopupOpen, setStateAvatar] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [initialCards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [isRegisterDone, setRegisterDone] = useState(false);
  const [isInfoTooltipopen, setInfoTooltipopen] = useState(false);

  function openInfoTooltip(status) {
    setInfoTooltipopen(true);
    setRegisterDone(status);
  }
  function handleHistory(status) {
    status ? history.push("/sing-in") : history.push("/sing-up");
  }

  function handleCloseInfoTooltip() {
    const status = isRegisterDone;
    handleHistory(status);
    setInfoTooltipopen(false);
  }

  function handleCardClick(chosenCard) {
    setSelectedCard(chosenCard);
  }

  function handleEditAvatarClick() {
    setStateAvatar(true);
  }

  function handleEditProfileClick() {
    setStateProfile(true);
  }

  function handleAddPlaceClick() {
    setStateAdd(true);
  }

  function closeAllPopups() {
    setStateAvatar(false);
    setStateProfile(false);
    setStateAdd(false);
    setSelectedCard(undefined);
    setDeletePopupOpen(false);
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userDate, cardsDate]) => {
        setCurrentUser(userDate);
        setCards(
          cardsDate.map((card) => ({
            name: card.name,
            link: card.link,
            likes: card.likes,
            cardId: card._id,
            userId: card.owner._id,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .sendNewAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    api
      .changeLikeCardStatus(card._id, !card.isLiked)
      .then((updatedCard) => {
        const newCards = initialCards.map((card) => {
          return card.cardId !== updatedCard._id
            ? card
            : {
                name: updatedCard.name,
                link: updatedCard.link,
                likes: updatedCard.likes,
                cardId: updatedCard._id,
                userId: updatedCard.owner._id,
              };
        });
        setCards(newCards);
      })

      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api
      .removeCard(cardToDelete)
      .then(
        setCards((state) =>
          state.filter((item) => item.cardId != cardToDelete)
        ),
        closeAllPopups()
      )
      .catch((err) => console.log(err));
  }

  function handleDeleteClick(cardId) {
    setDeletePopupOpen(true);
    setCardToDelete(cardId);
  }

  function handleAddPlace(card) {
    api
      .sendNewCard(card)
      .then((data) => {
        const newCard = {
          name: data.name,
          link: data.link,
          likes: data.likes,
          cardId: data._id,
          userId: data.owner._id,
        };
        setCards([newCard, ...initialCards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            console.log(res);
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function registerUser(password, email) {
    auth
      .register(password, email)
      .then((response) => {
        if (response) {
          openInfoTooltip(true);
        } else {
          openInfoTooltip(false);
        }
      })
      .catch((err) => {
        openInfoTooltip(false);
        console.log(err);
      });
  }

  function authorizationUser(password, email) {
    auth
      .authorize(password, email)
      .then((token) => {
        if (token) {
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={initialCards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            userEmail={userEmail}
            component={Main}
          />

          <Route path="/sing-up">
            <Register registerUser={registerUser} />
          </Route>

          <Route path="/sing-in">
            <Login authorizationUser={authorizationUser} />
          </Route>
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipopen}
          isLogged={isRegisterDone}
          onClose={handleCloseInfoTooltip}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          buttonTitle="Да"
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
