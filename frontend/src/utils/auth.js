export const BASE_URL = 'http://217.28.228.138:3000';

function checkRequestResult(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`OMG error: ${response.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/sign-up`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkRequestResult);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/sign-in`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then(checkRequestResult)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("_id", data.token);
        return data.token;
      } else {
        return;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRequestResult);
};
