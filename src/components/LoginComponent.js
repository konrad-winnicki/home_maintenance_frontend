import React, { useContext, useEffect } from "react";
import { AuthorizationContext } from "../contexts/authorizationContext";
import { useNavigate } from "react-router-dom";
import {
  autoLogOutTiming,
  getCodeFromQueryParam,
  setTokenInLocalStorage,
} from "../services/loginAuxilaryFunctions";
import GoogleButton from "react-google-button";
import { oauthClientId, oauthRedirectUri } from "../config";
import { exchangeOauthCodeForToken } from "../services/login";
import { App } from "@capacitor/app";
import logo from "../logo.png";
export function LoginComponent() {
  const authorizationContext = useContext(AuthorizationContext);
  const navigate = useNavigate();

  function getGoogleOauthCodeUrl() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth?";
    const options = {
      redirect_uri: oauthRedirectUri,
      client_id: oauthClientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/userinfo.email"].join(" "),
    };
    const qs = new URLSearchParams(options);
    return `${rootUrl}${qs.toString()}`;
  }

  function redirectToGoogleLogin() {
    const uri = getGoogleOauthCodeUrl();
    window.location.href = uri;
  }

  function procceedWhenToken(token) {
    console.log("Token exchanged: " + token);
    setTokenInLocalStorage(token);
    authorizationContext.setLoggedIn(true);
    autoLogOutTiming(token, authorizationContext);
    navigate("/homes");
  }

  useEffect(() => {
    // TODO: where to place them?
    App.addListener("appUrlOpen", (data) => {
      console.log("App opened with URL details:", data.url);
      const extractedCode = data.url.split("?")[1];
      console.log("Extracted code:", data.url);
      navigate("/login?" + extractedCode);
    });

    const oauthCode = getCodeFromQueryParam(window.location.search);
    console.log("Oauth code from query param: " + oauthCode);
    if (oauthCode !== undefined && oauthCode !== null) {
      exchangeOauthCodeForToken(oauthCode)
        .then(
          (token) => {
            console.log("Attempting to set to token to: " + token);

            procceedWhenToken(token);
          },
          [authorizationContext]
        )
        .catch((e) => console.log(e));
    }
  });

  return (
    !authorizationContext.isLoggedIn && (
      <div className="container vh-100 vw-100">
        <div className="row justify-content-center">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "50%",
              height: "25%",
              objectFit: "cover",
              marginTop: "35%",
              marginBottom: "10%",
            }}
          />
          <div className="row justify-content-center">
            <GoogleButton onClick={redirectToGoogleLogin}></GoogleButton>
          </div>
        </div>
      </div>
    )
  );
}
