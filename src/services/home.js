const backendUrl = "http://localhost:5000/";

function headers(sessionCode) {
  return {
    "Content-Type": "application/json",
    Authorization: sessionCode,
  };
}

export function getHomes(sessionCode) {
  let promise = fetch(backendUrl + "homes", {
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
