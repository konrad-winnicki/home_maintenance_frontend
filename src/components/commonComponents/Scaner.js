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
      name: null,
      codeMatch: false,
      isScanning: false,
    };
    this.set_code = this.set_code.bind(this);
    this.set_codeMatch = this.checkIfBarcodesMatch.bind(this);
    this.setIsScanning = this.setIsScanning.bind(this);
    this.homeId = this.props.homeContext.home.id;
  }

  set_code(code) {
    this.setState((_previous) => {
      return { code: code, isScanning: false };
    });
  }

  set_name(name) {
    this.setState((_previous) => {
      return { name: name };
    });
  }

  checkIfBarcodesMatch() {
    return (code) => {
      const notificatorMessages = {
        unknown: "Barcodes did not match. Try again",
      };
      this.setState((previousState) => {
        if (previousState.code === code) {
          return { codeMatch: true, isScanning: false };
        } else {
          notificator(500, notificatorMessages);
          this.props.appContext.setAppState(APP_STATES.DEFAULT);
          return { code: null, isScanning: false };
        }
      });
    };
  }

  setIsScanning(param) {
    this.setState((_previous) => {
      return { isScanning: param };
    });
  }

  resetState() {
    this.setState((_previous) => {
      return {
        code: null,
        name: null,
        codeMatch: false,
        isScanning: false,
      };
    });
  }

  handleOnClick() {
    if (this.state.isScanning) {
      stopScanning();
      this.resetState();
      this.props.appContext.setAppState(APP_STATES.DEFAULT);
    } else {
      this.setIsScanning(true);
      this.props.appContext.setAppState(APP_STATES.SCANNING);
    }
  }

  pretendModificateItemUsingBarcode() {
    const barcode = this.state.code;
    return this.props
      .addOrModificateItem(barcode, this.homeId)
      .then(() => {
        this.resetState();
        this.props.appContext.setAppState(APP_STATES.DEFAULT);
      })
      .catch((error) => {
        console.log(error)
        alert ('To add barcode to database:\n\n1. Scan barcode again\n\n2. Indicate name')
        this.setIsScanning(true);
          scanBarcode(this.checkIfBarcodesMatch())
      });
  }


  componentDidUpdate() {
    if (this.state.codeMatch) {
      let product_name = askNameForBarcode();
        if (!product_name) {
          this.resetState();
          this.props.appContext.setAppState(APP_STATES.DEFAULT)}
          else{
            addBarcodeToDB(this.state.code, product_name, this.homeId);
            this.resetState();
          }
    } else if (this.state.code && !this.state.isScanning) {
      this.pretendModificateItemUsingBarcode();
    } else if (this.state.isScanning && !this.state.code) {
      scanBarcode(this.set_code);
    }
  }

  render() {
    const button_name = this.state.isScanning ? "Stop" : "Scan";
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
