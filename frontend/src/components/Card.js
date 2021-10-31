import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  link,
  name,
  likes,
  userId,
  onCardClick,
  onCardLike,
  onCardDelete,
  cardId,
}) {
  

  function handleClick() {
    onCardClick({ name: name, link: link });
  }

  function handleLikeClick() {
    onCardLike({ _id: cardId, isLiked: isLiked });
  }

  function handleDeleteClick() {
    onCardDelete(cardId);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = userId === currentUser._id;
  const isLiked = likes.some((item) => item._id === currentUser._id);

  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash_visible" : ""
  }`;

  let cardLikeButtonClassName = `element__info-heart ${
    isLiked ? "" : "element__info-heart_type_disabled"
  }`;

  return (
    <li className="elements__item">
      <div className="element">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <div
          className="element__img"
          onClick={handleClick}
          style={{
            backgroundImage: `url(${link})`,
            backgroundSize: "cover",
            ariaLabel: { name },
          }}
        ></div>
        <div className="element__info">
          <h2 className="element__info-place">{name}</h2>
          <div className="element__likes-container">
            <button
              type="button"
              onClick={handleLikeClick}
              className={cardLikeButtonClassName}
            ></button>
            <span className="element__info-likes">{likes.length}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
