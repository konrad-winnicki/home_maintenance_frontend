import React, { useRef, refs, useEffect } from 'react';
import * as myFunction from "./functions.js"
import Quagga from '@ericblade/quagga2'
import ReactDOM from 'react-dom/client';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'

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
    this.state = { check_status: false };
    this.checked_list = []
    //this.ff=this.ff(this)
    //this = this.handleChangeName.bind(this);
    //this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    //this.checkBoxHandler=this.checkBoxHandler(this)
    //this.push2=this.push2.bind(this)
    this.state_changer = this.state_changer.bind(this)
  }

  // push2(id) {
  // this.checked_list.push(id)
  // }

  state_changer(status) {
    //console.log("stad:", status)
    this.setState({ check_status: true })
  }

  componentDidMount() {
    // console.log(this.props.active_component)

  }
  componentDidUpdate() {
    // console.log("productlist", this.checked_list, "productstate:", this.state)
    //if (this.state.check_status=="ticked"){console.log("ticked")}
  }

  render() {
    return (


      <div>
        <Table id="my_table" className=' table table-fixed'   >
          <thead className={"fs-5 fw-bold text-white"}>
            {this.props.active_component === "Application" ?
              <tr>
                <th className={styles.product_space_width}>Products at home</th>
              </tr> : null
            }
            {this.props.active_component === "Form" ?
              <tr>
                <th >Shopping list</th>
      
              </tr> : null
            }
          </thead>
          <tbody className={styles.table__body}>


            {this.props.product_list.map((product) => (

              <tr key={product.product_id} id={product.product_id} className={styles.table__row} >
                <td>
                  {this.props.active_component === "Application" ?
                    <button className="btn btn-primary btn-sm"
                      disabled={this.props.app_state !== "default" ? true : false}
                      onClick={() => { this.props.onclick({ app_state: "decrease", product_id: product.product_id }) }}
                    ><BsFillArrowDownSquareFill /></button> : null}
                </td>
                <td className={styles.table__product}
                  onClick={() => { this.props.onclick({ app_state: "changing name", product_id: product.product_id }) }}>{product.name}</td>

                <td className={styles.table__quantity}
                onClick={() => { this.props.onclick({ app_state: "custom_quantity", product_id: product.product_id }) }}>{product.quantity}</td>
                {this.props.active_component === "Application" ?
                  <td><button className={"btn btn-primary btn-sm"}
                    disabled={this.props.app_state !== "default" ? true : false}
                    onClick={() => { this.props.onclick({ app_state: "increase", product_id: product.product_id }) }}
                  ><BsFillArrowUpSquareFill /></button></td> : null}

                {this.props.active_component === "Form" ?
                  <td>
                    <Checkbox app_state={this.props.app_state} app_onclick_handler={this.props.onclick} id={product.product_id} checkbox_status={product.checkout} />

                  </td> : null}
                <td><button className="btn btn-danger btn-sm"
                  disabled={this.props.app_state !== "default" ? true : false}
                  onClick={() => { this.props.onclick({ app_state: "deleting product", product_id: product.product_id }) }}
                ><FaTrashRestoreAlt /></button></td>


              </tr>

            ))}

          </tbody>
        </Table>
      </div>
    )
  }

}

function Checkbox(props) {
  const [checked, setChecked] = useState(props.checkbox_status);
  const handleChange = () => setChecked(!checked);

  useEffect(() => {
      props.app_onclick_handler({ app_state: "checkbox_status", checkbox_status: checked, product_id: props.id })
  }, [checked]);

  return (
    <div>
      <input className="form-check-input" style={{ width: '25px', height: '25px' }}
      disabled={props.app_state !== "default" ? true : false}
        type="checkbox" defaultChecked={checked} value="" id="flexCheckIndeterminate"
        onChange={handleChange}>
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
    // console.log(this.state)
    if (this.state.login_status === "unlogged") { window.open("http://localhost:3000", "_self") }
  }

  render() {
    return (
      <div className='container vh-100 vw-100 d-flex flex-column'>
        <nav className="navbar sticky-top bg-warning vw-100" style={{ position: 'fixed' }}  >
          <div className='col text-end'>
            <button className="btn btn-outline-success" onClick={() => { this.setState({ showComponent: "Application", app_state: "refreshing products" }); }} ><ImListNumbered /></button> </div>
          <div className='col text-center '>
            <button className="btn btn-outline-success" onClick={() => { this.setState({ showComponent: "Form", app_state: "refreshing products" }); }
            }><AiOutlineShoppingCart /> Shoping list</button></div>
        </nav>
        <div>
          {this.state.showComponent === "Application" ?
            <Application session_code={this.props.session_code} nad_app_state={this.stateChanger} active_component={this.state.showComponent} /> :
            null
          }
          {this.state.showComponent === "Form" ?
            <Application session_code={this.props.session_code} nad_app_state={this.stateChanger} active_component={this.state.showComponent} /> :
            null
          }
        </div>
      </div>
    )
  }
}


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app_state: "default", name: "", quantity: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
  }
 
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeQuantity(event) {
    this.setState({ quantity: event.target.value });
  }

  componentDidUpdate() {
    console.log(this.state.name, this.state.quantity)
    if (this.state.app_state === "adding_product"){
      this.props.handler({ "name": this.state.name, "quantity": this.state.quantity })
    this.setState({app_state:"default", name:"", quantity:''}) 

  }}

  render() {
    return (
      
        <div className='row mt-1 sticky-top' >
          <div className='col text-center'>
          
            <input value={this.state.name} disabled={this.props.app_state !== "default" ? true : false} className='form-control input-lg' type="text" placeholder="Type product name" onChange={this.handleChangeName} ></input>
          </div>
          <div className='col text-center'>
            <input value={this.state.quantity} disabled={this.props.app_state !== "default" ? true : false} className='form-control input-lg' type="number" placeholder="Quantity" onChange={this.handleChangeQuantity}></input>
          </div>
          <div className='col text-left'>
            <button disabled={this.props.app_state !== "default" ? true : false} className="btn btn-primary"
             onClick={() => {this.setState({app_state: "adding_product"})  }}><MdAddBox /></button>
          </div>
        </div>
     
    )
  }
}


class Application extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this)
    this.pushing = this.pushing.bind(this)
    this.shoppingListExport = this.shoppingListExport.bind(this)
    this.prepareListOfFinishedProducts=this.prepareListOfFinishedProducts.bind(this)
    this.finishedProductsExport=this.finishedProductsExport.bind(this)
    this.state = {
      product_list: [],
      product_to_buy: null,
      app_state: "default",
      checkbox_status: null,
      active_component: this.props.active_component,
      processed_product_id: null
    }
  }

  componentDidMount() {
    this.ProductListChanger()

  }

  componentDidUpdate() {
    console.log(this.state.product_list)
    if (this.state.product_to_buy != null) {
      this.setState({ app_state: "adding product" })
    }
    if (this.state.app_state === "checkbox_status") {

      this.changeCheckboxStatus(this.state.processed_product_id, this.state.checkbox_status)


    }
    if (this.state.app_state === "adding_finished_products") { 
     this.finishedProductsExport()
   // console.log(this.prepareListOfFinishedProducts())
    }
    if (this.state.app_state === "shopping_list_export") { this.shoppingListExport()}
    if (this.state.app_state === "adding product") { this.addProduct() }
    if (this.state.app_state === "changing name") { this.changeName(this.state.processed_product_id) }
    if (this.state.app_state === "deleting product") { this.delete(this.state.processed_product_id) }
    if (this.state.app_state === "custom_quantity") {
      this.changeQuantity("custom_quantity", this.state.processed_product_id)
    }
    
    if (this.state.app_state === "increase") {
      this.changeQuantity("increase", this.state.processed_product_id)
    }
    if (this.state.app_state === "decrease") {
      this.changeQuantity("decrease", this.state.processed_product_id)
    }
    if (this.state.app_state === "refreshing products") {
      this.ProductListChanger()
    }
    // console.log("SZOPING", this.state.product_to_buy)
  }

  pushing(product) {
    console.log("pushing")
    this.setState({ product_to_buy: product });
    //this.setState({list_update: true})
  }

  stateChanger(new_state) {
    this.setState({      
        app_state: new_state.app_state,
        processed_product_id: new_state.product_id,
        product_to_buy: new_state.product_to_buy,
        checkbox_status: new_state.checkbox_status      
    })
  }
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
    console.log("PRODUCTLISTCHANGER")
    return fetch(url, {
      method: "GET", headers: {
        "Authorization": this.props.session_code,
        "Active_component": this.state.active_component
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
      .finally(() => this.stateChanger({ checkbox_status: null, product_to_buy: null, app_state: "default", product_id: null }))

      .catch(error => {
        this.notifications("List download failed.\nCheck internet connection", "error")
      })
  }

  changeQuantity(method, product_id) {
    
    let quantity;
    if (method === "decrease") { quantity = -1 }
    if (method === "increase") { quantity = 1 }
    if (method === "custom_quantity"){quantity = myFunction.custom_quantity()}
    let product_data = {
      session_code: this.props.session_code,
      id: product_id,
      quantity: quantity
    }
    if (quantity != null) {myFunction.send_to_server(url, product_data, "PUT", this.state.active_component)
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
    }else { this.stateChanger({ app_state: "default", product_id: null }) }
  }

  prepare_checkout_shoping_list(){
    let checkout_shopping_list =[]
    let shopping_list = this.state.product_list
    for (let i=0; i<shopping_list.length; i++){
      if (shopping_list[i].checkout == true){
        checkout_shopping_list.push(shopping_list[i])}
    }
    console.log(checkout_shopping_list)
    return checkout_shopping_list
  }

prepareListOfFinishedProducts(){
  let finished_products = []
  let product_in_storage = this.state.product_list
  for (let i=0; i<product_in_storage.length; i++){
    if (product_in_storage[i].quantity == 0){
      finished_products.push(product_in_storage[i])
    }
}
return finished_products
}


finishedProductsExport() {
  let finished_products = this.prepareListOfFinishedProducts()
  let product_data = {
    session_code: this.props.session_code,
    product_list: finished_products
  }

  if (finished_products.length  != 0) {
    myFunction.send_to_server(url, product_data, "POST", this.state.app_state)
      .then((response) => {
        if (response.headers.get("content-type") === "application/json") {
          return response.json()
        } else { return response }
      })

      .then((response) => {
        if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
          this.stateChanger({app_state: "default"})
          //this.setState({ product_to_buy: null, app_state: "refreshing products", product_id: null })
          let message = "Finished products added to your shopping list."
          this.notifications(message, "success")
        }
      })

      .catch(Error => {
          this.stateChanger({app_state: "default"})
          this.notifications("Can not add products.\nCheck internet connection", "error")
      })

  } else { this.stateChanger({app_state: "default"}) }
}


  shoppingListExport() {
    let checked_out_products = this.prepare_checkout_shoping_list()
    let product_data = {
      session_code: this.props.session_code,
      product_list: checked_out_products
    }

    if (checked_out_products.length  != 0) {
      myFunction.send_to_server(url, product_data, "POST", this.state.app_state)
        .then((response) => {
          if (response.headers.get("content-type") === "application/json") {
            return response.json()
          } else { return response }
        })

        .then((response) => {
          if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
            this.stateChanger({app_state: "refreshing products"})
            //this.setState({ product_to_buy: null, app_state: "refreshing products", product_id: null })
            let message = "Selected products added to your store list."
            this.notifications(message, "success")
          }
        })

        .catch(Error => {
            this.stateChanger({app_state: "default"})
            this.notifications("Can not add products.\nCheck internet connection", "error")
        })

    } else { this.stateChanger({app_state: "default"}) }
 }





  addProduct() {
    let product_data;
    if (this.state.active_component == "Application") {
      let product_name = myFunction.ask_product_name();
      product_data = {
        session_code: this.props.session_code,
        name: product_name,
        quantity: 1
      }
    }
    if (this.state.active_component == "Form") {
      product_data = {
        session_code: this.props.session_code,
        name: this.state.product_to_buy.name,
        quantity: this.state.product_to_buy.quantity
      }
    }

    if (product_data.name != null) {
      myFunction.send_to_server(url, product_data, "POST", this.state.active_component)
        .then((response) => {
          if (response.headers.get("content-type") === "application/json") {
            return response.json()
          } else { return response }
        })

        .then((response) => {
          if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
            console.log("product to buy=nu;;", this.state.product_to_buy)
            this.stateChanger({ product_to_buy: null, app_state: "refreshing products", product_id: null })
            //this.setState({ product_to_buy: null, app_state: "refreshing products", product_id: null })

            let message = product_data.name + " just added"
            this.notifications(message, "success")
          }
        })

        .catch(Error => {
          if (Error === 409) {
            this.stateChanger({ product_to_buy: null, app_state: "default", product_id: null })

            let message = product_data.name + " already exists."
            this.notifications(message, "warning")

          } else {
            this.stateChanger({ product_to_buy: null, app_state: "default", product_id: null })
            this.notifications("Can not add product.\nCheck internet connection", "error")
          }
        })

    } else { this.stateChanger({ product_to_buy: null, app_state: "default", product_id: null }) }
  }


  changeCheckboxStatus(product_id, check_box_status) {
    let product_data = {
      session_code: this.props.session_code,
      id: product_id,
      checkbox_status: check_box_status
    }

    if (product_data != null) {
      myFunction.send_to_server(url, product_data, "PATCH", this.state.active_component)
        .then((response) => {
          if (response.headers.get("content-type") === "application/json") {
            return response.json()
          } else { return response }
        })
        .then((response) => {
          if (response.login_status === "unlogged") { this.props.nad_app_state() } else {
            this.stateChanger({ checkbox_status: null, app_state: "refreshing products", product_id: null })
          }
        })
        .catch(Error => {
          console.log(Error)
          this.stateChanger({ checkbox_status: null, app_state: "default", product_id: null })
          this.notifications("Can not change name.\nCheck internet connection", "error")

        })
    } else { this.stateChanger({ checkbox_status: null, app_state: "default", product_id: null }) }
  }




  changeName(product_id) {
    let product_data = myFunction.change_name(product_id, this.props.session_code)
    if (product_data != null) {
      myFunction.send_to_server(url, product_data, "PATCH", this.state.active_component)
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


      myFunction.send_to_server(url, product_data, "DELETE", this.state.active_component)
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
        <div className='container vh-100 vw-100 d-flex flex-column'>
          <div className='row'>
          </div>
          <div className='row position-realtive'>
            <VideoAcceptor />
          </div>
          <div className='row flex-grow-1 mt-5  ' style={{ overflow: "auto" }}>
            <div className="col m-0 p-0 ">
              <ProductList
                product_list={
                  this.state.product_list}
                app_state={this.state.app_state}
                onclick={this.onClickHandler}
                active_component={this.props.active_component} />
            
            </div>
           
            {this.props.active_component === "Form" ?
              <Form app_state={this.state.app_state} handler={this.pushing} />
              :
              null
            }
           
          </div>
          


          <div className="row mt-3 pt-3 pb-3 bg-primary">
            <div className="col text-center ">
            {this.props.active_component === "Application" ?
          
              <AddProductButton
              app_state={this.state.app_state}
              onclick_handler={this.onClickHandler}>
            </AddProductButton>
            :
              <AddProductsFromShoppingList
              app_state={this.state.app_state}
              list={this.state.product_list}
              onclick_handler={this.onClickHandler}
              shopingListExport = {this.shopingListExport}>
              </AddProductsFromShoppingList>
            }
            </div>
            <div className="col text-start ">
            {this.props.active_component === "Application" ?
            <AddFinishedProducts
            app_state={this.state.app_state}
            list={this.state.product_list}
            onclick_handler={this.onClickHandler}>
           
            </AddFinishedProducts>: null}
            </div>
            <div className="col text-center"><Scaner notifications={this.notifications} app_state={this.state.app_state}
              onclick_handler={this.onClickHandler}>
            </Scaner>
            </div>
          </div>
        </div>
      </div>
    )
  }

}




class AddProductButton extends React.Component {
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


class AddFinishedProducts extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-warning btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => { this.props.onclick_handler({ app_state: "adding_finished_products"}) }}>
        Add to shopping list
      </button>

    )
  }
}

class AddProductsFromShoppingList extends React.Component {
  
  
  render() {
    return (
      <button type="button" className="btn btn-warning btn-sm"
        disabled={this.props.app_state !== "default" ? true : false}
        onClick={() => { this.props.onclick_handler({ app_state: "shopping_list_export"}) }}>
        Add shoppings
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
      this.props.onclick_handler({ app_state: "default", product_id: null })
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
      this.props.onclick_handler({ app_state: "default", product_id: null })
      this.setState((ignored) => { return { code: null } })
    }

    if (this.props.app_state == "Scaning barcode" && this.state.code != null) {
      this.props.onclick_handler({ app_state: "Sending to server", product_id: null })
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

        this.props.onclick_handler({ app_state: "refreshing products", product_id: null })
        let message = "Product just added"
        this.props.notifications(message, "success")
      })
      .catch(Error => {
        if (Error == 409) {
          let product = prompt("Product with this name already exists. You have to set different name for importing barcode", "");
          if (product == "" || product == null) {
            this.props.onclick_handler({ app_state: "Canceled", product_id: null })
            return null;
          }
          let product_data = {
            session_code: this.props.session_code,
            name: product,
            barcode: barcode2
          }
          myFunction.send_to_server(url, product_data, "POST")
            .then(() => {
              this.props.onclick_handler({ app_state: "refreshing products", product_id: null })
              let message = "Product just added"
              this.props.notifications(message, "success")
            })
            .catch(Error => {
              if (Error == 409) {
                this.props.onclick_handler({ app_state: "Canceled", product_id: null })
                let message = "Product with " + product_data.name + " already exists." +
                  "\nYou have to set different name for importing barcode"
                this.props.notifications(message, "warning")

              }
            })

        }


        if (Error == 404) {
          let product = prompt("Product name", "");
          if (product == "" || product == null) {
            this.props.onclick_handler({ app_state: "Canceled", product_id: null })
            return null;
          }
          let product_data = {
            session_code: this.props.session_code,
            name: product,
            barcode: barcode2
          }
          myFunction.send_to_server(url, product_data, "POST")
            .then(() => {
              this.props.onclick_handler({ app_state: "refreshing products", product_id: null })
              let message = "Product just added"
              this.props.notifications(message, "success")
            })
            .catch(Error => {
              if (Error == 409) {
                let product = prompt("Product already exists. Try again with different name", "");
                if (product == "" || product == null) {
                  this.props.onclick_handler({ app_state: "Canceled", product_id: null })
                  return null;
                }
                let product_data = {
                  session_code: this.props.session_code,
                  name: product,
                  barcode: barcode2
                }
                myFunction.send_to_server(url, product_data, "POST")
                  .then(() => { this.props.onclick_handler({ app_state: "refreshing products", product_id: null }) })
                  .catch(Error => {
                    if (Error == 409) {
                      this.props.onclick_handler({ app_state: "Canceled", product_id: null })

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
      onClick={() => { this.props.onclick_handler({ app_state: state, product_id: null }) }}
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