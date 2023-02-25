import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import NadApp from './ss';
import { GoogleLogin } from '@react-oauth/google'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Button } from 'react-bootstrap';

import { FcGoogle } from 'react-icons/fc';

import createReactClass from 'create-react-class';
import { Google } from 'react-oauth2';


function fetching() {
  let promise = fetch("https://localhost:5000/code/", {
    headers: { 'Content-Type': 'text/html' },
    method: "GET"
  }).then(response => {
    return response.json();
  }).then((json => {
    window2(json.url);
    console.log(json.url)
  })).catch(Error => { console.log(Promise.reject(Error)) })
  return promise
}

async function window2(url2) {
  window.open(url2, "_self");
}


class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_status: "unloged",
      session_code: null
    };
  }

  componentDidMount() {
    let params = new URLSearchParams(window.location.search)
    let session_code = params.get("session_code")
    console.log(params.get("session_code"))
    if (session_code != null) {
      this.setState((ignores) => {
        return {
          login_status: "loged", session_code: session_code

        }
      });
    }
    if (session_code === "unlogged") {
      this.setState((ignores) => {
        return {
          login_status: "unloged", session_code: null
        }
      })
    }
    console.log("did mount")
  }

  componentDidUpdate() {
    console.log("updated")
  }

  render() {
    return (
      <div className='container vh-100 vw-100 d-flex  align-items-center'>
        {this.state.login_status === "loged" ?
          <NadApp session_code={this.state.session_code} /> :
          null}
        {this.state.login_status === "unloged" ?
          <Button style={{
            backgroundColor: 'white', color: "black",
            borderColor: 'black', fontSize: '24px', borderWidth:
              'medium'
          }} onClick={() => { fetching() }}><FcGoogle />  LOGIN WITH GOOGLE</Button> :
          null
        }
      </div>
    )
  }
}

const container = document.getElementById('root');
const productsComponent = createRoot(container);
productsComponent.render(
  <div>
    <GoogleOAuthProvider clientId="70482292417-ki5kct2g23kaloksimsjtf1figlvt3ao.apps.googleusercontent.com">
      <React.StrictMode>
        <App2 />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </div >
)



/*
function App() {
  

  const login = useGoogleLogin({
    clientId: "70482292417-ki5kct2g23kaloksimsjtf1figlvt3ao.apps.googleusercontent.com",
    onSuccess: codeResponse => {console.log(codeResponse);
      send_code(codeResponse)
    },
    flow: 'auth-code',
    redirect_uri: "https://localhost:5000/login/callback",
    ux_mode: "popup",
    
  
  });


  return (
    <div>

      <Button onClick={() => { fetching() }}>LOGIN WITH GOOGLE</Button>
    </div>
  )
}

*/

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application/>
  </React.StrictMode>
);
*/



//<NadApp />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
