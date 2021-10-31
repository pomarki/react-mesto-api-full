import React, { useRef } from "react";

import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-form"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__section">
        <input
          required
          className="popup__text-field"
          type="url"
          ref={avatarRef}
          placeholder="Ссылка на картинку"
          name="avatar-link"
          id="avatar-link"
        />
        <span className="popup__input-error" id="avatar-link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
