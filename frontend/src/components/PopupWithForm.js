import React from "react";

function PopupWithForm({
  title,
  name,
  buttonTitle,
  isOpen,
  children,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`popup page__popup ${
        isOpen && "popup_opened"
      } id="popup-${name}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button link"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          onSubmit={onSubmit}
          className="popup__form"
          autoccomplete="off"
        >
          {children}
        </form>
        <button
          type="button"
          onClick={onSubmit}
          className="popup__save-button"
          id={`popup-${name}-button`}
        >
          {buttonTitle}
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
