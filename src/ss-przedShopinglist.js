import React, { useRef, refs, useEffect } from 'react';
import * as myFunction from "./functions.js"
import Quagga from '@ericblade/quagga2'
import ReactDOM from 'react-dom/client';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import {useState} from 'react'

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillArrowUpSquareFill, BsFillArrowDownSquareFill } from "react-icons/bs";
import Table from 'react-bootstrap/Table';
import { BsUpcScan } from 'react-icons/bs';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { SiAddthis } from 'react-icons/si';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ImListNumbered } from 'react-icons/im';
import { MdAddBox } from 'react-icons/md';

//import { GoogleLogin } from '@react-oauth/google'
import styles from './my-style.module.css';
import { getValue } from '@testing-library/user-event/dist/utils/index.js';
// import { Event } from 'react-toastify/dist/core/eventManager.js';
//import { MdLibraryAdd} from '@react-icons/all-files/fa/MdLibraryAdd';
//import { FaBeer } from "@react-icons/all-files/fa/FaBeer "
const url = "https://localhost:5000/products/"
//const url = "https://kitchen-backend.fly.dev/products/"







class ProductList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {check_status:false};
      this.checked_list = []
      //this.ff=this.ff(this)
      //this = this.handleChangeName.bind(this);
      //this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
      //this.checkBoxHandler=this.checkBoxHandler(this)
      //this.push2=this.push2.bind(this)
      this.state_changer = this.state_changer.bind(this)
    }


push2(id){
  this.checked_list.push(id)
}
state_changer (status){
  console.log("stad:", status)
  this.setState({check_status: true})
}

componentDidMount(){
  console.log(this.props.active_component)
 
}
componentDidUpdate(){ 
  console.log("productlist", this.checked_list, "productstate:", this.state)
  //if (this.state.check_status=="ticked"){console.log("ticked")}
}

  render() {return (

    
    <div>
      <Table id="my_table" className=' table table-fixed'   >

        <thead className="fs-5 fw-bold text-white">
        {this.props.active_component === "Application" ?
          <tr>
            <th className={styles.buton_space_width}></th>
            <th className={styles.product_space_width}>Product</th>
            <th className={styles.quantity_space_width} >Quantity</th>
            <th className={styles.buton_space_width}></th>
            <th className={styles.buton_space_width}></th>
          </tr>:null
}
{this.props.active_component === "Form" ?
          <tr>
            <th className={styles.buton_space_width}></th>
            <th className={styles.product_space_width}>Shopping list</th>
            <th className={styles.quantity_space_width} ></th>
            <th className={styles.buton_space_width}></th>
            <th className={styles.buton_space_width}></th>
          </tr>:null
}
        </thead>
        <tbody >


          {this.props.product_list.map((product) => (

            <tr key={product.product_id} id={product.product_id} className={styles.horizontal_divider} >
              <td>
              {this.props.active_component === "Application" ?
                <button className="btn btn-primary btn-sm"
                  disabled={this.props.app_state !== "default" ? true : false}
                  onClick={() => { this.props.onclick({ app_state: "decrease", product_id: product.product_id }) }}
                ><BsFillArrowDownSquareFill /></button>: null}
              </td>
              <td className=" data-editable fs-6 fw-bold ff"
                onClick={() => { this.props.onclick({ app_state: "changing name", product_id: product.product_id }) }}>{product.name}</td>

              <td className="fs-6 fw-bold text-center">{product.quantity}</td>
              {this.props.active_component === "Application" ?
              <td><button className="btn btn-primary btn-sm"
                disabled={this.props.app_state !== "default" ? true : false}
                onClick={() => {this.props.onclick({ app_state: "increase", product_id: product.product_id }) }}
              ><BsFillArrowUpSquareFill /></button></td>:null}
              {this.props.active_component === "Form" ?
              <td> 
              <Checkbox handler={this.state_changer} name={product.name}/>
              
              </td>:null}
              
              
              <td><button className="btn btn-danger btn-sm"
                disabled={this.props.app_state !== "default" ? true : false}
                onClick={() => {this.props.onclick({ app_state: "deleting product", product_id: product.product_id }) }}
              ><FaTrashRestoreAlt /></button></td>
            </tr>))}

        </tbody>
      </Table>
    </div>
  )
}

}

function Checkbox(props) { 
  
  const [checked, setChecked] = useState(false); 
  const handleChange = () => { 
    
    setChecked(!checked);
    
    
  };
  
 //const Parent = () => {props.checkBoxHandler()}
  const mounted = useRef(false);

  useEffect(() => {
    if (checked==true){
    props.handler("ticked")
     //console.log(props.name)
      // Parent()
     }else{console.log("unchecked")}
  });
  
  
  
  return ( 
    
    <div> 
    
    <input class="form-check-input" style={{width: '25px', height: '25px'}}
              type="checkbox" value="" id="flexCheckIndeterminate"
              onChange={()=>{handleChange()}}>
              </input>
      
    </div> 
    
  ); 
  
}; 





export default class NadApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stateChanger = this.stateChanger.bind(this);
    this.state = {
      showComponent: "",
      login_status: "logged"
    };
  }


  stateChanger(new_state) {
    this.setState((ignores) => {
      return {
        login_status: "unlogged"
      }
    })
  }


  componentDidUpdate() {
    console.log(this.state)
    if (this.state.login_status === "unlogged") { window.open("http://localhost:3000", "_self") }
  }

  render() {

    return (
      <div class='container vh-100 vw-100 d-flex flex-column'>
        <nav class="navbar sticky-top bg-warning vw-100" style={{ position: 'fixed' }}  >



          <div className='col text-end'>
            <button class="btn btn-outline-success" onClick={() => { this.setState({ showComponent: "Application" }); console.log("guzik1", this.state) }} ><ImListNumbered /></button> </div>
          <div className='col text-center '>
            <button class="btn btn-outline-success" onClick={() => { this.setState({ showComponent: "Form" }); console.log("gizik2", this.state) }
            }><AiOutlineShoppingCart /> Do not click yet</button></div>

        </nav>
        <div>



          {this.state.showComponent === "Application" ?
            <Application session_code={this.props.session_code} nad_app_state={this.stateChanger} active_component={this.state.showComponent} /> :
            null
          }
          {this.state.showComponent === "Form" ?

            <Form session_code={this.props.session_code} nad_app_state={this.stateChanger} active_component={this.state.showComponent} /> :
            null
          }

        </div>
      </div>

    )
  }
}



/*
<ProductList
                product_list={this.list}
                app_state={this.state.app_state}
                onclick={this.onClickHandler} />
*/






class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {processed_product_id: "",
    app_state: "default", list_update: false, name: " ", quantity: 0 };
    this.list = []
    this.checked_list =[]
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    //this.stateChanger = this.stateChanger(this)
  }

  
  pushing() {
    this.list.push(this.state);
    this.setState({list_update: true})
    //console.log("ala")

  }


  //checkBoxHandler(){
   // console.log("invokeke")
    //this.checked_list.push("checked")
  //}

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  componentDidMount() {
    console.log("form", this.state, this.list)
  }

  componentDidUpdate() {
    console.log("form", "state:", this.state, "list:", this.list)
  }


  render() {


    return (

      <div class='container vh-100 vw-100 d-flex flex-column'>


        <div className="row  mt-5  bg-primary text-white text-center">Shoping list</div>

        <div>
          <div>
          <ProductList
                product_list={this.list}
                app_state={this.state.app_state}
                onclick={this.onClickHandler} 
                active_component={"Form"}
                />
          </div>
          <div className='row mt-1'>
            <div className='col text-center'>
              <input type="text" placeholder="Type product name" onChange={this.handleChangeName} ></input>
            </div>
            <div className='col text-center'>

              <input id="aa" type="text" placeholder="Quantity" onChange={this.handleChangeQuantity}></input>
            </div>
            <div className='col text-left'>
              <button className="btn btn-primary btn-sm" onClick={() => { this.pushing() }}><MdAddBox /></button>
            </div>
          </div>
        </div>

      </div>

    )
  }
}





class Application extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this)
    this.state = {
      product_list: [],
      app_state: "default",
      processed_product_id: null


    }
  }


  componentDidMount() {

    this.ProductListChanger()
  }

  componentDidUpdate() {


    if (this.state.app_state === "adding product") { this.addProduct() }
    if (this.state.app_state === "changing name") { this.changeName(this.state.processed_product_id) }
    if (this.state.app_state === "deleting product") { this.delete(this.state.processed_product_id) }

    if (this.state.app_state === "increase") {
      this.changeQuantity("increase", this.state.processed_product_id)
    }
    if (this.state.app_state === "decrease") {
      this.changeQuantity("decrease", this.state.processed_product_id)
    }
    if (this.state.app_state === "refreshing products") {
      this.ProductListChanger()
    }
    console.log("app_state", this.state.app_state)
  }

  stateChanger(new_state) {
    this.setState((ignores) => {
      return {
        app_state: new_state.app_state,
        processed_product_id: new_state.product_id
      }
    })
  }
  //
  onClickHandler(new_state) {
    this.stateChanger(new_state)
  }


  notifications(message, type) {
    if (type == "success") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toast-message'
      });
    }
    if (type == "warning") {
      toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT

      });
    }
    if (type == "error") {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }

  };





  ProductListChanger() {
    return fetch(url, {
      method: "GET", headers: {
        "Authorization": this.props.session_code
      }
    })
      .then((response) => {
        if (response.headers.get("content-type") === "application/json") {
          return response.json()
        } else { return response }
      })

      .then(response => {
        if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
          let products = response
          this.setState(ignored => { return { product_list: products } })
        }
      })
      .finally(() => this.stateChanger({ app_state: "default", product_id: null }))
      .catch(error => {
        this.notifications("List download failed.\nCheck internet connection", "error")
      })
  }



  changeQuantity(method, product_id) {
    let quantity;
    if (method === "decrease") { quantity = -1 } else { quantity = 1 }
    let product_data = {
      session_code: this.props.session_code,
      id: product_id,
      quantity: quantity

    }
    myFunction.send_to_server(url, product_data, "PUT")
      .then((response) => {
        if (response.headers.get("content-type") === "application/json") {
          return response.json()
        } else { return response }
      })
      .then((response) => {
        if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
          this.stateChanger({ app_state: "refreshing products", product_id: null })
        }
      })
      .catch(Error => {
        this.stateChanger({ app_state: "default", product_id: null })
        this.notifications("Can not change quantity.\nCheck internet connection", "error")
      }
      )
  }

  addProduct() {
    let product_name = myFunction.ask_product_name()
    let product_data;
    if (product_name != null) {
      myFunction.send_to_server(url, product_data = {
        session_code: this.props.session_code,
        name: product_name,
        quantity: 1
      }, "POST")
        .then((response) => {
          if (response.headers.get("content-type") === "application/json") {
            return response.json()
          } else { return response }
        })

        .then((response) => {
          if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
            this.stateChanger({ app_state: "refreshing products", product_id: null })
            let message = product_data.name + " just added"
            this.notifications(message, "success")
          }
        })

        .catch(Error => {
          if (Error === 409) {
            this.stateChanger({ app_state: "default", product_id: null })

            let message = product_data.name + " already exists."
            this.notifications(message, "warning")

          } else {
            this.stateChanger({ app_state: "default", product_id: null })
            this.notifications("Can not add product.\nCheck internet connection", "error")
          }
        })

    } else { this.stateChanger({ app_state: "default", product_id: null }) }
  }


  changeName(product_id) {
    let product_data = myFunction.change_name(product_id, this.props.session_code)
    if (product_data != null) {
      myFunction.send_to_server(url, product_data, "PATCH")
        .then((response) => {
          if (response.headers.get("content-type") === "application/json") {
            return response.json()
          } else { return response }
        })
        .then((response) => {
          if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
            this.stateChanger({ app_state: "refreshing products", product_id: null })
            let message = "Product name changed to " + product_data.new_name
            this.notifications(message, "success")
          }
        })
        .catch(Error => {
          if (Error === 409) {
            this.stateChanger({ app_state: "default", product_id: null })
            let message = "You have already product named " + product_data.new_name + "."
            this.notifications(message, "warning")


          } else {
            this.stateChanger({ app_state: "default", product_id: null })
            this.notifications("Can not change name.\nCheck internet connection", "error")
          }

        })
    } else { this.stateChanger({ app_state: "default", product_id: null }) }

  }


  async delete(product_id) {
    let confirmation = await window.confirm("Are you sure?");
    if (!confirmation) {
      this.stateChanger({ app_state: "default", product_id: null })
    }
    else {

      let product_data = {
        session_code: this.props.session_code,
        id: product_id
      }
      myFunction.send_to_server(url, product_data, "DELETE")
        .then((response) => {
          if (response.headers.get("content-type") === "application/json") {
            return response.json()
          } else { return response }
        })
        .then((response) => {
          if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
            this.stateChanger({ app_state: "refreshing products", product_id: null })
            let message = "Product deleted"
            this.notifications(message, "success")
          }
        })
        .catch(Error => {
          this.stateChanger({ app_state: "default", product_id: null })
          this.notifications("Can not delete product.\nCheck internet connection", "error")
        }
        )
    }
  }


  /*

  className='row flex-grow-1' style={{ overflow: "auto" }}
        container
        row
        column
        row
        row
        */


  render() {

    return (
      <div  >
        <ToastContainer ></ToastContainer>

        <div class='container vh-100 vw-100 d-flex flex-column'>
          <div className='row'>

          </div>

          <div className='row position-realtive'>
            <VideoAcceptor />
          </div>
          <div className='row flex-grow-1 mt-5  ' style={{ overflow: "auto" }}>

            <div className="col m-0 p-0 ">
              <ProductList
                product_list={this.state.product_list}
                app_state={this.state.app_state}
                onclick={this.onClickHandler}
                active_component={"Application"} />
            </div>

          </div>

          <div className="row mt-3 pt-3 pb-3 bg-primary">
            <div className="col text-center"><AppButton
              app_state={this.state.app_state}
              onclick_handler={this.onClickHandler}>
            </AppButton>
            </div>
            <div className="col text-center"><Scaner notifications={this.notifications} app_state={this.state.app_state}
              state_changer={this.onClickHandler}>
            </Scaner>
            </div>

          </div>

        </div>

      </div>

    )
  }

}

















class AppButton extends React.Component {

  render() {

    return (

      <button type="button" className="btn btn-warning btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => { this.props.onclick_handler({ app_state: "adding product", product_id: null }) }}>
        <SiAddthis /> product
      </button>

    )
  }
}



class VideoAcceptor extends React.Component {
  render() {
    return (<div>

      <div className={styles.video2} id={"videoStream"}></div>

    </div>
    )
  }
}


class Scaner extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { code: null }
    this.set_code = this.set_code.bind(this)
  }

  componentDidUpdate() {

    if (this.props.app_state == "Stop scaning") {
      Quagga.offDetected()
      Quagga.stop();
      this.props.state_changer({ app_state: "default", product_id: null })
      let comments = document.querySelector("#videoStream")
      comments.innerHTML = ""
    }
    if (this.props.app_state == "default") {
      this.setState((ignored) => { return { code: null } })
    }
    if (this.props.app_state == "Scaning barcode" && this.state.code == null) {

      this.scan_barcode(this.set_code)
    }

    if (this.props.app_state == "Sending to server") {
      this.send_to_server_barcode(this.state.code)
    }
    if (this.props.app_state == "Canceled") {
      this.props.state_changer({ app_state: "default", product_id: null })
      this.setState((ignored) => { return { code: null } })
    }

    if (this.props.app_state == "Scaning barcode" && this.state.code != null) {
      this.props.state_changer({ app_state: "Sending to server", product_id: null })
    }
  }

  set_code(code) {
    this.setState(
      previous => {
        return { code: code }
      }
    )
  }



  scan_barcode(function_changing_local_status) {


    Quagga.init({
      numOfWorkers: navigator.hardwareConcurrency,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        constraints: {
          //width: 700,
          //height: 700
          width: 300,
          height: 300
        },
        target: document.querySelector('#videoStream')
      },
      frequency: 5,
      locator: {
        halfSample: true,
        patchSize: "large", // x-small, small, medium, large, x-large

      },
      decoder: {
        readers: ["ean_reader"]
      },
      locate: true
    }, function (err) {

      if (err) {
        return
      }


      Quagga.onDetected(
        (data) => {
          if (data && data.codeResult) {
            let code = data.codeResult.code;
            Quagga.offDetected();
            Quagga.stop();
            beep_sound()
            let comments = document.querySelector("#videoStream")
            setTimeout(() => {

              function_changing_local_status(code)
              comments.innerHTML = ''
            }, 110)
          }
        }
      )
      console.log("Initialization finished. Ready to start");
      Quagga.start()
    }
    )
  }


  send_to_server_barcode(barcode2) {
    let product_data = {
      session_code: this.props.session_code,
      barcode: barcode2
    }
    myFunction.send_to_server(url, product_data, "POST")
      .then(() => {

        this.props.state_changer({ app_state: "refreshing products", product_id: null })
        let message = "Product just added"
        this.props.notifications(message, "success")
      })
      .catch(Error => {
        if (Error == 409) {
          let product = prompt("Product with this name already exists. You have to set different name for importing barcode", "");
          if (product == "" || product == null) {
            this.props.state_changer({ app_state: "Canceled", product_id: null })
            return null;
          }
          let product_data = {
            session_code: this.props.session_code,
            name: product,
            barcode: barcode2
          }
          myFunction.send_to_server(url, product_data, "POST")
            .then(() => {
              this.props.state_changer({ app_state: "refreshing products", product_id: null })
              let message = "Product just added"
              this.props.notifications(message, "success")
            })
            .catch(Error => {
              if (Error == 409) {
                this.props.state_changer({ app_state: "Canceled", product_id: null })
                let message = "Product with " + product_data.name + " already exists." +
                  "\nYou have to set different name for importing barcode"
                this.props.notifications(message, "warning")

              }
            })

        }


        if (Error == 404) {
          let product = prompt("Product name", "");
          if (product == "" || product == null) {
            this.props.state_changer({ app_state: "Canceled", product_id: null })
            return null;
          }
          let product_data = {
            session_code: this.props.session_code,
            name: product,
            barcode: barcode2
          }
          myFunction.send_to_server(url, product_data, "POST")
            .then(() => {
              this.props.state_changer({ app_state: "refreshing products", product_id: null })
              let message = "Product just added"
              this.props.notifications(message, "success")
            })
            .catch(Error => {
              if (Error == 409) {
                let product = prompt("Product already exists. Try again with different name", "");
                if (product == "" || product == null) {
                  this.props.state_changer({ app_state: "Canceled", product_id: null })
                  return null;
                }
                let product_data = {
                  session_code: this.props.session_code,
                  name: product,
                  barcode: barcode2
                }
                myFunction.send_to_server(url, product_data, "POST")
                  .then(() => { this.props.state_changer({ app_state: "refreshing products", product_id: null }) })
                  .catch(Error => {
                    if (Error == 409) {
                      this.props.state_changer({ app_state: "Canceled", product_id: null })

                      let message = "You have already product named " + product_data.name + "." +
                        "\nTry again with different name"
                      this.props.notifications(message, "warning")

                    }
                  })

              }
            })
        }
      })


  }



  render() {
    let button_name;
    let state = "Scaning barcode"
    if (this.props.app_state != "Sending to server") { button_name = "Scan" }
    if (this.props.app_state == "Scaning barcode") { button_name = "Stop scaning"; state = "Stop scaning" }
    if (this.props.app_state == "Sending to server") { button_name = "Stop scaning" }
    //if (this.props.app_state == "Stop scaning" || this.props.app_state == "default") {button_name = "Scaning barcode"}
    return (<button type="button" className="btn btn-warning btn-sm"
      disabled={(this.props.app_state !== "default" && this.props.app_state != "Scaning barcode")
        ? true : false}
      onClick={() => { this.props.state_changer({ app_state: state, product_id: null }) }}
    >{button_name} <BsUpcScan />
    </button>)
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