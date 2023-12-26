const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const oauthClientId =process.env.REACT_APP_OAUTH_CLIENT_ID;

const oauthRedirectUri = frontendUrl + "/login";

export { backendUrl, oauthClientId, oauthRedirectUri };
