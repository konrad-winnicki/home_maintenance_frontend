import { backendUrl } from "../config";
const loginEndpoint = backendUrl + "login";

export async function exchangeOauthCodeForToken(queryStringWithCode) {
  return fetch(loginEndpoint + "?code=" + queryStringWithCode, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(response);
        return Promise.reject(new Error("Failed to exchange oauth code."));
      } else {
        return response.json();
      }
    })
    .then((json) => json.token)
    .catch((e) => {
      console.log("Error exchanging oauth code: " + e);
    });
}
