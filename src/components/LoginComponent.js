import React, { useContext, useEffect } from "react";
import { AuthorizationContext } from "../contexts/authorizationContext";
import { useNavigate } from "react-router-dom";
import {
  autoLogOutTiming,
  getCodeFromQueryParam,
} from "../loginAuxilaryFunctions";
import GoogleButton from "react-google-button";
import { oauthClientId, oauthRedirectUri } from "../config";
import { exchangeOauthCodeForToken } from "../services/login";

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

  useEffect(() => {
    /* TODO: deep links
    App.addListener("appStateChange", ({ isActive }) => { console.log("App state changed. Is active?", isActive); });
    App.addListener("appUrlOpen", (data) => { console.log("App opened with URL details:", data.url); });
    */

    const oauthCode = getCodeFromQueryParam(window.location.search);
    console.log("Oauth code from query param: " + oauthCode);
    if (oauthCode !== undefined && oauthCode !== null) {
      exchangeOauthCodeForToken(oauthCode).then((token) => {
        // TODO: extract and use useCallback
        console.log("Token exchanged: " + token);

        if (token) {
          localStorage.setItem("session_code", token);
          authorizationContext.setLoggedIn(true);
          autoLogOutTiming(token, authorizationContext);
          // TODO: use routing instead of this redirect:
          navigate("/homes");
        }
      }, [authorizationContext]);
    }
  });

  return (
    !authorizationContext.isLoggedIn && (
      <div className="container vh-100 vw-100 d-flex align-items-center">
        <div className="flex items-center justify-center">
          <GoogleButton onClick={redirectToGoogleLogin}></GoogleButton>
        </div>
      </div>
    )
  );
}
