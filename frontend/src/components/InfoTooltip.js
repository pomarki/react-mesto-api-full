import React from "react";

function InfoTooltip({ isOpen, isLogged, onClose }) {
  
  const infoPictureType = isLogged
    ? "popup__info-picture"
    : "popup__info-picture popup__info-picture_type_fail";

    const infoText = isLogged
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз."
  return (
    <div className={`popup page__popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button link"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <div className={infoPictureType} />
        <p className="popup__subtitle">{infoText}</p>
        
      </div>
    </div>
  );
}

export default InfoTooltip;
