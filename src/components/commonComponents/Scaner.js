import React, { useContext } from "react";
import { BsUpcScan } from "react-icons/bs";
import { AppContext } from "../../contexts/appContext.js";
import { APP_STATES } from "../../applicationStates.js";
import "./BottomNavbarButtons.css";
import { scanBarcode, stopScanning } from "../../services/scanerSettings.js";
import { HomeContext } from "../../contexts/homeContext.js";
import {
  askNameForBarcode,
  notificator,
} from "../../services/auxilaryFunctions.js";
import { addBarcodeToDB } from "../barcodeActions/barcodeActionsAuxFunctions.js";
class Scaner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      status: "BEFORE_FIRST_SCAN",
    };
    this.set_code = this.set_code.bind(this);
    this.set_codeMatch = this.checkIfBarcodesMatch.bind(this);
    this.homeId = this.props.homeContext.home.id;
  }

  isScanning() {
    return (
      this.state.status === "FIRST_SCAN" || this.state.status === "SECOND_SCAN"
    );
  }

  set_code(code) {
    this.setState(() => {
      return { code: code, status: "AFTER_FIRST_SCAN" };
    });
  }
  //TODO pass function not call
  checkIfBarcodesMatch() {
    return (code) => {
      const notificatorMessages = {
        unknown: "Barcodes did not match. Try again",
      };
      this.setState((previousState) => {
        if (previousState.code === code) {
          return { status: "AFTER_SECOND_SCAN" };
        } else {
          notificator(500, notificatorMessages);
          this.props.appContext.setAppState(APP_STATES.DEFAULT);
          return { code: null, status: "BEFORE_FIRST_SCAN" };
        }
      });
    };
  }

  resetState() {
    this.setState((_previous) => {
      return {
        code: null,
        status: "BEFORE_FIRST_SCAN",
      };
    });
  }

  handleOnClick() {
    if (this.isScanning()) {
      stopScanning();
      this.resetState();
      this.props.appContext.setAppState(APP_STATES.DEFAULT);
    } else {
      this.setState(() => {
        return {
          status: "FIRST_SCAN",
        };
      });
      this.props.appContext.setAppState(APP_STATES.SCANNING);
    }
  }
  //TODO: isScaning and app_state duplication

  attemptToModifyItemUsingBarcode() {
    const barcode = this.state.code;
    return this.props
      .addOrModificateItem(barcode, this.homeId)
      .then(() => {
        this.resetState();
        this.props.appContext.setAppState(APP_STATES.DEFAULT);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "To add barcode to database:\n\n1. Scan barcode again\n\n2. Indicate name"
        );
        this.setState(() => {
          return { status: "SECOND_SCAN" };
        });
      });
  }

  componentDidUpdate() {
    if (this.state.status === "FIRST_SCAN") {
      scanBarcode(this.set_code);
    } else if (this.state.status === "AFTER_FIRST_SCAN") {
      this.attemptToModifyItemUsingBarcode();
    } else if (this.state.status === "SECOND_SCAN") {
      scanBarcode(this.checkIfBarcodesMatch());
    } else if (this.state.status === "AFTER_SECOND_SCAN") {
      let product_name = askNameForBarcode();
      if (!product_name) {
      } else {
        addBarcodeToDB(this.state.code, product_name, this.homeId);
      }
      this.resetState();
      this.props.appContext.setAppState(APP_STATES.DEFAULT);

    }
  }

  render() {
    const button_name = this.isScanning() ? "Stop" : "Scan";
    return (
      <div className="col text-center ">
        <button
          type="button"
          className="bottom_navbar_buttons"
          disabled={
            this.props.appContext.appState !== APP_STATES.DEFAULT &&
            this.props.appContext.appState !== APP_STATES.SCANNING
              ? true
              : false
          }
          onClick={() => {
            this.handleOnClick();
          }}
        >
          {button_name} <BsUpcScan />
        </button>
      </div>
    );
  }
}

export function WrappedScaner(props) {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  return (
    <Scaner
      modifyProductInState={props.modifyProductInState}
      addProductToState={props.addProductToState}
      appContext={appContext}
      homeContext={homeContext}
      scanerActions={props.scanerActions}
      addOrModificateItem={props.addOrModificateItem}
    ></Scaner>
  );
}

export default Scaner;
