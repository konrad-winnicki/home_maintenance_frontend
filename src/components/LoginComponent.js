import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { AuthorizationContext } from "../contexts/authorizationContext";
import { useNavigate} from "react-router-dom";

const backendUrl = "http://localhost:5000";
//const backendUrl = "https://backend.home-maintenance.click"
const redirectUri = "http%3A%2F%2Flocalhost%3A3000%2Fcode"; // TODO: try without it, without code

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_status: "unlogged",
    };
  }

  fetchSessionId(oauthCode) {
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

  getGoogleOauth() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth?";
    const options = {
      redirect_uri: "http://localhost:5000/code/callback",
      client_id:
        "70482292417-ki5kct2g23kaloksimsjtf1figlvt3ao.apps.googleusercontent.com",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    return `${rootUrl}${qs.toString()}`;
  }

  googleLogin() {
    console.log("login button");
    const uri = this.getGoogleOauth();
    window.location.href = uri;
    //window.open(uri, "_self")
  }

  componentDidMount() {
    const oauth_code = getCookie("session_code");
    console.log('oauth_code', oauth_code)
    if (oauth_code) {
      localStorage.setItem("session_code", oauth_code);
      document.cookie = `session_code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      this.props.authorizationContext.setLoggedIn(true);
    }
  }

  componentDidUpdate() {
    const navigate = this.props.navigate;
    navigate("/products");
  }

  render() {
    return (
      <div className="container vh-100 vw-100 d-flex  align-items-center">
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
              this.googleLogin();
            }}
          >
            <FcGoogle /> Login with Google
          </Button>
        ) : null}
      </div>
    );
  }
}

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

export function WrappedLoginComponent() {
  const navigate = useNavigate();

  const authorizationContext = useContext(AuthorizationContext);

  return (
    <LoginComponent
      navigate={navigate}
      authorizationContext={authorizationContext}
    ></LoginComponent>
  );
}

export default LoginComponent;
