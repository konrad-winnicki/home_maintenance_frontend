import React, { useContext } from "react";
import Quagga from "@ericblade/quagga2";
import { BsUpcScan } from "react-icons/bs";
import * as myFunction from "../services/auxilaryFunctions.js";
import { AppContext } from "../contexts/appContext.js";
import { APP_STATES } from "../applicationStates.js";
import { HomeContext } from "../contexts/homeContext.js";
import "../components/commonComponents/BottomNavbarButtons.css";
// export const url = "https://localhost:5000/products/";
export const url = "https://backend.home-maintenance.click/";

class Scaner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { code: null, status: "STOP_SCANNING", isScanning:false };
    this.set_code = this.set_code.bind(this);
  }

  /*
  shouldComponentUpdate(props, prevState) {
    console.log("should update", prevState, this.state.code);
    if (
      props.appContext.appState === APP_STATES.SCANNING &&
      this.state.code == null
    ) {
      console.log("scaning");
      this.setState((previous) => {
        return { status: "SCANNING" };
      });
      this.scanBarcode(this.set_code);
    }
/*
    if (prevState.status === "SCANNING") {
      this.setState((previous) => {
        return { status: "STOP_SCANNING" };
      });
    }


    if (prevState.code) {
      this.setState((previous) => {
        return { status: "STOP_SCANNING" };
      });
    }
*
    if (prevState.state === "STOP_SCANNING") {
      Quagga.offDetected();
      Quagga.stop();
      props.appContext.setAppState(APP_STATES.DEFAULT);
      let comments = document.querySelector("#videoStream");
      comments.innerHTML = "";
    }
  }
*/
  componentDidMount(prevProps, prevState) {
    console.log("mount", this.state, prevProps, prevState);
  }

  componentDidUpdate(props, prevState) {
    if (this.state.isScanning){
      console.log('start scanning')
    }
    /*
    if (this.props.app_state === "Stop scaning") {
      Quagga.offDetected();
      Quagga.stop();
      this.props.appContext.setAppState(APP_STATES.DEFAULT);

      this.props.state_changer({ app_state: APP_STATES.DEFAULT, product_id: null });
      let comments = document.querySelector("#videoStream");
      comments.innerHTML = "";
    }

    */
   /*
    if (props.appContext.appState === APP_STATES.DEFAULT) {
      this.setState((ignored) => {
        return { code: null };
      });
    }
    if (
      props.appContext.appState === APP_STATES.SCANNING &&
      this.state.code == null
    ) {
      console.log("scaning");
      this.scanBarcode(this.set_code);
    }*/
    /*
    if (this.props.app_state === "Sending to server") {
      this.send_to_server_barcode(this.state.code);
    }
    if (this.props.app_state === "Canceled") {
      this.props.state_changer({ app_state: "default", product_id: null });
      this.setState((ignored) => {
        return { code: null };
      });
    }
*/
    if (
      this.props.appContext.appState === APP_STATES.SCANNING &&
      this.state.code != null
    ) {
      console.log("scaning");
      /*
      this.props.state_changer({
        app_state: "Sending to server",
        product_id: null,
      });*/
    }
  }

  set_code(code) {
    this.setState((previous) => {
      return { code: code };
    });
  }


  setIsScanning (param){
    console.log('set is scanning')
    this.setState((previous) => {
      console.log('prev', previous)
      return { isScanning: param };
    });
    console.log('After setState:', this.state);

  }
  scanBarcode(function_changing_local_status) {
    Quagga.init(
      {
        numOfWorkers: navigator.hardwareConcurrency,
        inputStream: {
          name: "Live",
          type: "LiveStream",
          constraints: {
            //width: 700,
            //height: 700
            width: 300,
            height: 300,
          },
          target: document.querySelector("#videoStream"),
        },
        frequency: 5,
        locator: {
          halfSample: true,
          patchSize: "large", // x-small, small, medium, large, x-large
        },
        decoder: {
          readers: ["ean_reader"],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return;
        }

        Quagga.onDetected((data) => {
          if (data && data.codeResult) {
            let code = data.codeResult.code;
            Quagga.offDetected();
            Quagga.stop();
            beep_sound();
            let comments = document.querySelector("#videoStream");
            setTimeout(() => {
              function_changing_local_status(code);
              comments.innerHTML = "";
            }, 110);
          }
        });
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );
  }

  send_to_server_barcode(barcode2) {
    let product_data = {
      session_code: this.props.session_code,
      barcode: barcode2,
    };
    myFunction
      .send_to_server(url, product_data, "POST")
      .then(() => {
        this.props.state_changer({
          app_state: "refreshing products",
          product_id: null,
        });
        let message = "Product just added";
        this.props.notifications(message, "success");
      })
      .catch((Error) => {
        if (Error === 409) {
          let product = prompt(
            "Product with this name already exists. You have to set different name for importing barcode",
            ""
          );
          if (product === "" || product == null) {
            this.props.state_changer({
              app_state: "Canceled",
              product_id: null,
            });
            return null;
          }
          let product_data = {
            session_code: this.props.session_code,
            name: product,
            barcode: barcode2,
          };
          myFunction
            .send_to_server(url, product_data, "POST")
            .then(() => {
              this.props.state_changer({
                app_state: "refreshing products",
                product_id: null,
              });
              let message = "Product just added";
              this.props.notifications(message, "success");
            })
            .catch((Error) => {
              if (Error === 409) {
                this.props.state_changer({
                  app_state: "Canceled",
                  product_id: null,
                });
                let message =
                  "Product with " +
                  product_data.name +
                  " already exists." +
                  "\nYou have to set different name for importing barcode";
                this.props.notifications(message, "warning");
              }
            });
        }

        if (Error === 404) {
          let product = prompt("Product name", "");
          if (product === "" || product == null) {
            this.props.state_changer({
              app_state: "Canceled",
              product_id: null,
            });
            return null;
          }
          let product_data = {
            session_code: this.props.session_code,
            name: product,
            barcode: barcode2,
          };
          myFunction
            .send_to_server(url, product_data, "POST")
            .then(() => {
              this.props.state_changer({
                app_state: "refreshing products",
                product_id: null,
              });
              let message = "Product just added";
              this.props.notifications(message, "success");
            })
            .catch((Error) => {
              if (Error === 409) {
                let product = prompt(
                  "Product already exists. Try again with different name",
                  ""
                );
                if (product === "" || product == null) {
                  this.props.state_changer({
                    app_state: "Canceled",
                    product_id: null,
                  });
                  return null;
                }
                let product_data = {
                  session_code: this.props.session_code,
                  name: product,
                  barcode: barcode2,
                };
                myFunction
                  .send_to_server(url, product_data, "POST")
                  .then(() => {
                    this.props.state_changer({
                      app_state: "refreshing products",
                      product_id: null,
                    });
                  })
                  .catch((Error) => {
                    if (Error === 409) {
                      this.props.state_changer({
                        app_state: "Canceled",
                        product_id: null,
                      });

                      let message =
                        "You have already product named " +
                        product_data.name +
                        "." +
                        "\nTry again with different name";
                      this.props.notifications(message, "warning");
                    }
                  });
              }
            });
        }
      });
  }

  render() {
   
   const button_name = this.state.isScanning? "Stop": "dd"
   
    /*
    if (this.props.appContext.appState === APP_STATES.DEFAULT) {
      button_name = "Scan";
    }
    if (this.props.appContext.appState !== APP_STATES.DEFAULT) {
      button_name = "Stop scaning";
      state = "Stop scaning";
    }
    */
    //if (this.props.app_state == "Stop scaning" || this.props.app_state == "default") {button_name = "Scaning barcode"}
    
    
    return (
      <div className="col text-center ">
        <button
          type="button"
          className="bottom_navbar_buttons"
          //disabled={this.props.appContext.appState !== APP_STATES.DEFAULT ? true : false}

          onClick={() => {
            this.state.isScanning? this.setIsScanning(false): this.setIsScanning(true)
           // this.props.appContext.setAppState(APP_STATES.SCANNING);
          }}
        >
          {button_name} <BsUpcScan />
        </button>
      </div>
    );
  }
}

export function WrappedScaner() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  return <Scaner appContext={appContext} homeContext={homeContext}></Scaner>;
}

function beep_sound() {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "square";
  oscillator.frequency.value = 800;
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(function () {
    oscillator.stop();
  }, 100);
}

export default Scaner;
