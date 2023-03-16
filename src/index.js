import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NadApp from "./ss_zmiany";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const backendUrl = "https://localhost:5000";
const redirectUri = "http%3A%2F%2Flocalhost%3A3000%2Fcode"; // TODO: try without it, without code

function fetchSessionId(oauthCode) {
  // TODO: POST
  return fetch(
    backendUrl +
      "/code/callback?code=" +
      oauthCode +
      "&redirect_uri=" +
      redirectUri,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((json) => json.session_code);
}

/*
  Redirect points to frontend which obtains the code.
  Then the frontend calls /token endpoint to make the backend exchange the code for the token and reply with sessionId/sessionToken
*/
function obtain_oauth_code() {
  // TODO: remove scopes if not needed
  // TODO: add CSRF protection using state, can be persisted to localstorage to verify later
  const mafaClientId =
    "70482292417-ki5kct2g23kaloksimsjtf1figlvt3ao.apps.googleusercontent.com";
  //const clientId =
    //"1005726387321-isia3js27sbejl9q91le4hot0knosdge.apps.googleusercontent.com";
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?response_type=code" +
    "&client_id=" +
    mafaClientId +
    "&redirect_uri=" +
    redirectUri +
    "&scope=openid+email+profile";
  console.log("Redirecting to: ", url);
  window.open(url, "_self");
}

class App2 extends React.Component {
  constructor(props) {
    super(props);
    console.log("App2 constructor");
    this.state = {
      login_status: "unlogged",
      session_code: null,
    };
  }

  componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    let oauth_code = params.get("code");
    console.log("oauth_code:", oauth_code);

    if (oauth_code) {
      fetchSessionId(oauth_code).then((session_code) =>
        this.setState((ignores) => {
          return {
            login_status: "logged",
            session_code: session_code,
          };
        })
      );
    }

    console.log("did mount App2");
  }

  componentDidUpdate() {
    console.log("updated");
  }

  render() {
    return (
      <div className="container vh-100 vw-100 d-flex  align-items-center">
        {this.state.login_status === "logged" ? (
          <NadApp session_code={this.state.session_code} />
        ) : null}
        {this.state.login_status === "unlogged" ? (
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              borderColor: "black",
              fontSize: "24px",
              borderWidth: "medium",
            }}
            onClick={() => {
              obtain_oauth_code();
            }}
          >
            <FcGoogle /> Login with Google
          </Button>
        ) : null}
      </div>
    );
  }
}

const container = document.getElementById("root");
const productsComponent = createRoot(container);
productsComponent.render(
  <div>
    <App2 />
  </div>
);