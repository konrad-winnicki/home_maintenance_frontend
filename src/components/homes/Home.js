import { useContext, useEffect } from "react";
import { HomeContext } from "../../contexts/homeContext";
import "./Home.css";
import "../ResourceComponent.css";
import "../ResourceButtons.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { jwtDecode } from "jwt-decode";
import {
  serverResponseResolver,
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions";
import { deleteUserFromHome } from "../../services/home";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { SwipeRightContext } from "../../contexts/SwipeRight";
import { logOut } from "../../services/loginAuxilaryFunctions";

export default function Home({ home }) {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const sessionCode = localStorage.getItem("session_code");
  const swipeRightContext = useContext(SwipeRightContext);

  function setHomeHandler() {
    homeContext.setHome(home);
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(home.id)
      .then(() => {
        alert(
          "Home id copied to clipboard. You can share it to invite other members."
        );
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard:", err);
      });
  };

  const leaveHome = () => {
    console.log(home.id, homeContext.home?.id);
    if (home.id === homeContext.home?.id) {
      alert("First enter other home from list and then leave home permanently");
      return null;
    }
    const confirmation = window.confirm(`Do you want to leave ${home.name}?`);
    if (!confirmation) {
      return null;
    }
    const decodedToken = jwtDecode(sessionCode);
    const userId = decodedToken.user_id;
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      success: "You left home",
      unknown: "Unknown error",
    };

    deleteUserFromHome(home.id, userId, sessionCode)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              homeContext.deleteHomeFromState(home.id);
            },
            401: () => {
              logOut();
            },
          };
          errorHandler(result.statusCode, actions);
          notificator(result.statusCode, notificatorMessages);
        });
      })
      .catch((error) => {
        console.log(error);
        notificator(500, notificatorMessages);
      });

    appContext.setAppState(APP_STATES.DEFAULT);
  };

  useEffect(() => {
    swipeRightContext.actionFunctionSetter(leaveHome, 'left');
  }, [homeContext.home]);

  const homeStyle =
    home.id === homeContext.home?.id ? "picked_item" : "default_item";
  return (
    <div>
      <div className={homeStyle}>
        <div className="product__name" onClick={setHomeHandler}>
          {home.name}
        </div>
        <button
          className="resource_button"
          onClick={() => {
            copyToClipboard();
          }}
        >
          <HiOutlineClipboardDocumentList />
        </button>
      </div>
    </div>
  );
}
