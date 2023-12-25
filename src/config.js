// Local env:
const frontendUrl = "http://localhost:3000";
const backendUrl = "http://localhost:5000/";
const oauthClientId =
  "70482292417-ki5kct2g23kaloksimsjtf1figlvt3ao.apps.googleusercontent.com";
const oauthRedirectUri = frontendUrl + "/login";

// Dev env (home-maintenance-priv):
// const frontendUrl = "http://localhost:3000"
// const backendUrl = "https://backend.home-maintenance.click/";
// const oauthClientId = "1005726387321-isia3js27sbejl9q91le4hot0knosdge.apps.googleusercontent.com";
// const oauthRedirectUri = frontendUrl + "/login";

export { backendUrl, oauthClientId, oauthRedirectUri };
