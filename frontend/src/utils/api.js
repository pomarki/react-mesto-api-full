const adress_URL = "http://localhost:3005";

export class Api {
  constructor({ address }) {
    this._address = address;
  }
  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
        headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`
      },
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`
      },
    }).then(this._checkResponse);
  }

  changeUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  sendNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`,
      },
    }).then((response) =>
      response.ok
        ? Promise.resolve("success")
        : Promise.reject(`Ошибка ${response.status}`)
    );
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`,
      },
    }).then(this._checkResponse);
  }

  sendNewAvatar(avatar) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('_id')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  address: adress_URL,
});

export default api;