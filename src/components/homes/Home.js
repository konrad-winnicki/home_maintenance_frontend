import { useContext } from "react";
import { HomeContext } from "../../contexts/homeContext";
import "./Home.css";
import "../ResourceComponent.css";
import "../ResourceButtons.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";

import { GiCancel } from "react-icons/gi";

export default function Home({ home }) {
  const homeContext = useContext(HomeContext);
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
