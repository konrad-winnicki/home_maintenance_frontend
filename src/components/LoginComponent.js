import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { AuthorizationContext } from "../contexts/authorizationContext";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";
import {
  getCookie,
  autoLogOutTiming,
} from "../loginAuxilaryFunctions";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: "unlogged",
    };
  }

  getGoogleOauth() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth?";
    const options = {
      redirect_uri: backendUrl + "code/callback",
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
    const uri = this.getGoogleOauth();
    window.location.href = uri;
  }

  componentDidMount() {
    const oauth_code = getCookie("session_code");
    if (oauth_code) {
      localStorage.setItem("session_code", oauth_code);
      document.cookie = `session_code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      this.props.authorizationContext.setLoggedIn(true);
      autoLogOutTiming(oauth_code, this.props.authorizationContext);
    }
  }

  componentDidUpdate() {
    const navigate = this.props.navigate;
    navigate("/products");
  }

  render() {
    return (
      <div className="container vh-100 vw-100 d-flex  align-items-center">
        {this.state.loginStatus === "unlogged" ? (
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

function WrappedLoginComponent() {
  const navigate = useNavigate();
  const authorizationContext = useContext(AuthorizationContext);

  return (
    <LoginComponent
      navigate={navigate}
      authorizationContext={authorizationContext}
    ></LoginComponent>
  );
}

export default WrappedLoginComponent;
