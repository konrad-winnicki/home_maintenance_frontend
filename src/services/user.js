import { backendUrl } from "../config";
const userEndpoint = backendUrl + `users`;
export function deleteUser(authorization_code) {
    return fetch(userEndpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization_code,
      },
      method: "DELETE",
    });
  }