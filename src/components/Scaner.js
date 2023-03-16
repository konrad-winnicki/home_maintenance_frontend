import React from "react";
import Quagga from "@ericblade/quagga2";
import { BsUpcScan } from "react-icons/bs";
import * as myFunction from "../functions.js";

export const url = "https://localhost:5000/products/";


class Scaner extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { code: null };
      this.set_code = this.set_code.bind(this);
    }
  
    componentDidUpdate() {
      if (this.props.app_state == "Stop scaning") {
        Quagga.offDetected();
        Quagga.stop();
        this.props.state_changer({ app_state: "default", product_id: null });
        let comments = document.querySelector("#videoStream");
        comments.innerHTML = "";
      }
      if (this.props.app_state == "default") {
        this.setState((ignored) => {
          return { code: null };
        });
      }
      if (this.props.app_state == "Scaning barcode" && this.state.code == null) {
        this.scan_barcode(this.set_code);
      }
  
      if (this.props.app_state == "Sending to server") {
        this.send_to_server_barcode(this.state.code);
      }
      if (this.props.app_state == "Canceled") {
        this.props.state_changer({ app_state: "default", product_id: null });
        this.setState((ignored) => {
          return { code: null };
        });
      }
  
      if (this.props.app_state == "Scaning barcode" && this.state.code != null) {
        this.props.state_changer({
          app_state: "Sending to server",
          product_id: null,
        });
      }
    }
  
    set_code(code) {
      this.setState((previous) => {
        return { code: code };
      });
    }
  
    scan_barcode(function_changing_local_status) {
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
          if (Error == 409) {
            let product = prompt(
              "Product with this name already exists. You have to set different name for importing barcode",
              ""
            );
            if (product == "" || product == null) {
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
                if (Error == 409) {
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
  
          if (Error == 404) {
            let product = prompt("Product name", "");
            if (product == "" || product == null) {
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
                if (Error == 409) {
                  let product = prompt(
                    "Product already exists. Try again with different name",
                    ""
                  );
                  if (product == "" || product == null) {
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
                      if (Error == 409) {
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
      let button_name;
      let state = "Scaning barcode";
      if (this.props.app_state != "Sending to server") {
        button_name = "Scan";
      }
      if (this.props.app_state == "Scaning barcode") {
        button_name = "Stop scaning";
        state = "Stop scaning";
      }
      if (this.props.app_state == "Sending to server") {
        button_name = "Stop scaning";
      }
      //if (this.props.app_state == "Stop scaning" || this.props.app_state == "default") {button_name = "Scaning barcode"}
      return (
        <button
          type="button"
          className="btn btn-warning btn-sm"
          disabled={
            this.props.app_state !== "default" &&
            this.props.app_state != "Scaning barcode"
              ? true
              : false
          }
          onClick={() => {
            this.props.state_changer({ app_state: state, product_id: null });
          }}
        >
          {button_name} <BsUpcScan />
        </button>
      );
    }
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


  export default Scaner