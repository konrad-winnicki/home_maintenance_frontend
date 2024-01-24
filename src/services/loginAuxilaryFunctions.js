import { jwtDecode } from "jwt-decode";
import { oauthRedirectUri } from "../config";

function getCodeFromQueryParam(queryString) {
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get("code");
  if (!code) {
    return null;
  }
  const encodedCode = encodeURIComponent(code);
  return encodedCode;
}

function calculateTimeToFinishToken(decodedToken) {
  const milisecondsPerSecond = 1000;
  const currentTimestampInSeconds = Math.round(
    Date.now() / milisecondsPerSecond
  );
  const remainingSeconds = decodedToken.exp - currentTimestampInSeconds;
  const bufferSecondsBeforeEnd = 60;
  const timeoutInMiliseconds =
    (remainingSeconds - bufferSecondsBeforeEnd) * milisecondsPerSecond;

  return timeoutInMiliseconds;
}
function autoLogOutTiming(currentToken) {
  const decodedToken = jwtDecode(currentToken);
  const timeToLogout = calculateTimeToFinishToken(decodedToken);
  setTimeout(() => {
    logOut();
  }, timeToLogout);
}

function logOut(){
  removeTokenFromLocalStorage("session_code");
  window.location.href = oauthRedirectUri;

}


function setTokenInLocalStorage(token) {
  localStorage.setItem("session_code", token);
}

function removeTokenFromLocalStorage(token) {
  localStorage.removeItem("session_code")
}

export {
  autoLogOutTiming,
  getCodeFromQueryParam,
  setTokenInLocalStorage,
  removeTokenFromLocalStorage,
  logOut
};
