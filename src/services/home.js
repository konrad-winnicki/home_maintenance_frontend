import { backendUrl } from "../config";
const homesEndpoint = backendUrl + "homes";
const homeEndpoint = (homeId) => homesEndpoint + "/" + homeId;
const homeMembersEndpoint = (homeId) => homeEndpoint(homeId) + "/members";
const homeMemberEndpoint = (homeId, userId) =>
  homeMembersEndpoint(homeId) + "/" + userId;

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

export async function joinHome(homeId, sessionCode) {
  return fetch(homeMembersEndpoint(homeId), {
    headers: headers(sessionCode),
    method: "POST",
  });
}

export function deleteUserFromHome(homeId, userId, sessionCode) {
  return fetch(homeMemberEndpoint(homeId, userId), {
    headers: headers(sessionCode),
    method: "DELETE",
  });
}
