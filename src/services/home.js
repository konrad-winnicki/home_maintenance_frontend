const backendUrl = "http://localhost:5000/";
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
  })
}
