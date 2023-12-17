import { jwtDecode } from "jwt-decode";

const getCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
};

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
function autoLogOutTiming(currentToken, authorizationContext) {
  const decodedToken = jwtDecode(currentToken);
  const timeToLogout = calculateTimeToFinishToken(decodedToken);
  setTimeout(() => {
    authorizationContext.setLoggedIn(false);
  }, timeToLogout);
}

export {getCookie, autoLogOutTiming}
