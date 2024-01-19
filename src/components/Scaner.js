import React, { useContext } from "react";
import { BsUpcScan } from "react-icons/bs";
import { AppContext } from "../contexts/appContext.js";
import { APP_STATES } from "../applicationStates.js";
import "../components/commonComponents/BottomNavbarButtons.css";
import { scanBarcode, stopScanning } from "../services/scanerSettings.js";
// export const url = "https://localhost:5000/products/";

export const url = "https://backend.home-maintenance.click/";

class Scaner extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.code !== nextState.code || this.state.isScanning !==nextState.isScanning
  }

  
  constructor(props) {
    super(props);
    this.state = { code: null, isScanning: false };
    this.set_code = this.set_code.bind(this);
    this.setIsScanning = this.setIsScanning.bind(this);
    this.ScanerActions = this.props.ScanerActions;
  }

  set_code(code) {
    console.log("called", code);
    this.setState((previous) => {
      return { code: code };
    });
  }

  setIsScanning(param) {
    this.setState((previous) => {
      return { isScanning: param };
    });
  }


  componentDidUpdate() {
    console.log("SCANER", this.props);
    if (this.state.code) {
      this.setIsScanning(false);
      stopScanning();
    } else if (this.state.isScanning) {
      this.props.appContext.setAppState(APP_STATES.SCANNING);
      scanBarcode(this.set_code);
      console.log("start scanning");
    } 
    
    else if (!this.state.isScanning) {
      console.log("block scanning");
      stopScanning();
      this.props.appContext.setAppState(APP_STATES.DEFAULT);
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
            this.state.isScanning
              ? this.setIsScanning(false)
              : this.setIsScanning(true);
             // this.set_code('565656')
            this.props.appContext.setAppState(APP_STATES.SCANNING);
          }}
        >
          {button_name} <BsUpcScan />
        </button>
        <this.ScanerActions
          modifyProductInState={this.props.modifyProductInState}
          addProductToState={this.props.addProductToState}
          set_code={this.set_code}
          setIsScanning={this.setIsScanning}
          barcode={this.state.code}
        ></this.ScanerActions>{" "}
      </div>
    );
  }
}

export function WrappedScaner(props) {
  const appContext = useContext(AppContext);
  return (
    <Scaner
      modifyProductInState={props.modifyProductInState}
      addProductToState={props.addProductToState}
      appContext={appContext}
      ScanerActions={props.ScanerActions}
    ></Scaner>
  );
}

export default Scaner;
