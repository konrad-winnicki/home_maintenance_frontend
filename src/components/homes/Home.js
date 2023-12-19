import { useContext } from "react";
import { HomeContext } from "../../contexts/homeContext";
import "./Home.css";
import "../ResourceComponent.css";
import "../ResourceButtons.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { serverResponseTranslator } from "../../services/auxilaryFunctions";
import { GiCancel } from "react-icons/gi";
import { deleteUserFromHome } from "../../services/home";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";

export default function Home({ home }) {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);
  const sessionCode = localStorage.getItem("session_code");

  function setHomeHandler() {
    console.log("sethome");
    homeContext.setHome(home);
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(home.id)
      .then(() => {
        alert("Home id copied to clipboard. You can share it to invite other family members.");
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard:", err);
      });
  };

  const leaveHome = () => {
    const confirmation = window.confirm(`Do you want to leave ${home.name}?`);
    if (!confirmation) {
      return;
    }
    const decodedToken = jwtDecode(sessionCode);
    const userId = decodedToken.user_id
    appContext.stateChanger({ appState: APP_STATES.AWAITING_API_RESPONSE });
  
    const response = deleteUserFromHome(home.id, userId, sessionCode )

    const messages = {
      success: "You left home",
      unknown: "Unknown error",
    };
    serverResponseTranslator(messages, response).then(() => {
      appContext.stateChanger({ appState: APP_STATES.REFRESHING });
    });
    
  };
  return (
    <>
      <div className="product__properties">
        <div className="product__name">{home.name}</div>
        <button
          className="button_surrounding btn btn-primary btn-sm"
          onClick={setHomeHandler}
        >
          <IoSettingsSharp />
        </button>
        <button
          className="button_surrounding btn btn-primary btn-sm"
          onClick={() => {
            copyToClipboard();
          }}
        >
          <HiOutlineClipboardDocumentList />
        </button>
        <button
          className="button_surrounding btn btn-danger btn-sm"
          onClick={() => {
            leaveHome();
          }}
        >
          <GiCancel />
        </button>
      </div>
    </>
  );
}