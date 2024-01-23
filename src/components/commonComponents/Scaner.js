import React, { useContext } from "react";
import { BsUpcScan } from "react-icons/bs";
import { AppContext } from "../../contexts/appContext.js";
import { APP_STATES } from "../../applicationStates.js";
import "./BottomNavbarButtons.css";
import { scanBarcode, stopScanning } from "../../services/scanerSettings.js";
import { HomeContext } from "../../contexts/homeContext.js";

class Scaner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: null, isScanning: false };
    this.set_code = this.set_code.bind(this);
    this.setIsScanning = this.setIsScanning.bind(this);
    this.homeId = this.props.homeContext.home.id;
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


handleOnClick(){
  if (this.state.isScanning){
    stopScanning();
    this.setIsScanning(false)
    this.props.appContext.setAppState(APP_STATES.DEFAULT)
  }else{
    this.setIsScanning(true)
    this.props.appContext.setAppState(APP_STATES.SCANNING);

  }

}

  performScanerActions() {
    const barcode = this.state.code;
    this.props.addOrModificateItem(barcode, this.homeId);
    this.props.appContext.setAppState(APP_STATES.DEFAULT);

  }

  componentDidUpdate() {
    console.log("SCANER", this.state);
    if (this.state.code) {
      this.set_code(null);
      this.setIsScanning(false);
      this.performScanerActions();
    } else if (this.state.isScanning) {
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
            this.handleOnClick()
            this.set_code("5");
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
