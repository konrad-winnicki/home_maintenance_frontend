import { backendUrl } from "../config";
const homesEndpoint = backendUrl + "homes";

function headers(sessionCode) {
  return {
    "Content-Type": "application/json",
    Authorization: sessionCode,
  };
}

export function getHomes(sessionCode) {
  let promise = fetch(homesEndpoint, {
    headers: headers(sessionCode),
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        console.log(response);
        return "Error";
      }
    })
    .catch((error) => {
      console.log(error);
      return "Error";
    });
  return promise;
}

export async function addHome(home, sessionCode) {
  return fetch(homesEndpoint, {
    headers: headers(sessionCode),
    method: "POST",
    body: JSON.stringify(home),
  });
}

export async function joinToHome(homeId, sessionCode) {
  return fetch(homesEndpoint + `/${homeId}/members`, {
    headers: headers(sessionCode),
    method: "POST",
  });
}

export function deleteUserFromHome(homeId, userId, authorization_code) {
  const endpointUrl = homesEndpoint + `/${homeId}/members/${userId}`;
  return fetch(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization_code,
    },
    method: "DELETE",
  });
}
