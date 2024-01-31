import React, { useContext } from "react";
import { getProducts } from "../../services/store";
import {
  serverResponseResolver,
  errorHandler,
  notificator,
} from "../../services/auxilaryFunctions";
import AddProductButton from "./AddProductButton";
import AddFinishedProductsToCart from "./AddFinishedProductToCart.js";
import ProductList from "./ProductList.js";
import { WrappedScaner } from "../commonComponents/Scaner.js";
import "../CardHeader.css";
import { AppContext } from "../../contexts/appContext";
import { HomeContext } from "../../contexts/homeContext";
import { BottomNavBar } from "../commonComponents/BottomNavBar";
import { APP_STATES } from "../../applicationStates";
import { VideoAcceptor } from "../commonComponents/VideoAcceptor";
import { adOrModificateProduct } from "../barcodeActions/adOrModificateProductWithBarcode";
import { logOut } from "../../services/loginAuxilaryFunctions";
import "./productCard.css";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

class ProductsCard extends React.PureComponent {
  constructor() {
    super();
    this.stateChanger = this.stateChanger.bind(this);
    this.addProductToState = this.addProductToState.bind(this);

    this.modifyProductInState = this.modifyProductInState.bind(this);
    this.deleteResourceFromState = this.deleteResourceFromState.bind(this);
    this.session_code = localStorage.getItem("session_code");
    this.state = {
      category: "fridge", // TODO: why here if it's also in context?
      productsToRender: [],
      fridge: [],
      larder: [],
      bathroom: [],
      other: [],
    };
  }

  stateChanger(product, category) {
    this.setState((prevState) => {
      return { [category]: [...prevState[category], product] };
    });
  }

  stateSetter(products, category) {
    this.setState(() => {
      return { [category]: products };
    });
  }

  setProductsToRender(category) {
    this.setState(() => {
      return { productsToRender: this.state[category] };
    });
  }

  checkIfCategoryListEmpty(category) {
    return this.state[category].length === 0;
  }
  addProductToState(product, category) {
    this.stateChanger(product, category);
  }

  changeCategory(category) {
    this.setState(() => {
      return {
        category: category,
      };
    });
  }

  filterArray(array, item) {
    const filteredProductList = array.filter(
      (product) => product.product_id !== item
    );
    return filteredProductList;
  }
  deleteResourceFromState(productId, category) {
    this.setState((prevState) => {
      const newProductsList = this.filterArray(prevState[category], productId);
      return { [category]: newProductsList };
    });
  }

  modifyProductInState(changedResource, category) {
    this.setState((prevState) => {
      const updatedProducts = prevState[category].map((product) => {
        if (product.product_id === changedResource.product_id) {
          return changedResource;
        }
        return product;
      });
      return { [category]: updatedProducts };
    });
  }

  componentDidMount() {
    this.getProducts(this.state.category);
  }

  getProducts(category) {
    const homeId = this.props.homeContext.home.id;
    const notificatorMessages = {
      unknown: "Unknown error",
    };

    getProducts(homeId, category, this.session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              this.stateSetter(result.body, category);
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
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('UPDATED')
    if (this.state.category !== prevState.category) {
      this.getProducts(this.state.category);
    }

    this.setProductsToRender(this.state.category);
  }

  render() {
    const blur =
      this.props.appContext.appState === APP_STATES.SCANNING
        ? "Blur(3px)"
        : "Blur(0px)";
    const brightness =
      this.props.appContext.appState === APP_STATES.SHOW_PROMPT
        ? "brightness(0.8)"
        : "";

    return (
      <React.Fragment>
        <VideoAcceptor />
        <div className="header" style={{ filter: `${brightness} ${blur}` }}>
          Products in {this.props.homeContext.home?.name}:
        </div>

        <Card
          style={{
            filter: `${brightness} ${blur}`,
            color: "red",
          }}
        >
          <Card.Header
            key={"nav"}
            style={{
              paddingLeft: "4%",
              paddingRight: "0%",
              paddingTop: "3%",
              paddingBottom: "2%",
              color: "red",
            }}
          >
            <Nav key={"nav"} variant="tabs" defaultActiveKey="#fridge">
              <Nav.Item
                style={{
                  width: "fit-content",
                  fontWeight: "bold",
                  padding: "0px",
                  mrgin: "0px",
                }}
              >
                <Nav.Link
                  href="#fridge"
                  onClick={() => {
                    this.changeCategory("fridge");
                  }}
                >
                  Fridge
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ width: "fit-content", fontWeight: "bold" }}>
                <Nav.Link
                  href="#larder"
                  onClick={() => {
                    this.changeCategory("larder");
                  }}
                >
                  Larder
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ width: "fit-content", fontWeight: "bold" }}>
                <Nav.Link
                  href="#bathroom"
                  onClick={() => {
                    this.changeCategory("bathroom");
                  }}
                >
                  Bathroom
                </Nav.Link>
              </Nav.Item>
              <Nav.Item style={{ width: "fit-content", fontWeight: "bold" }}>
                <Nav.Link
                  href="#other"
                  onClick={() => {
                    this.changeCategory("other");
                  }}
                >
                  Others
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
        </Card>

        <ProductList
          productList={this.state.productsToRender}
          modifyProductInState={this.modifyProductInState}
          deleteResourceFromState={this.deleteResourceFromState}
          addResourceToState={this.addProductToState}
        />

        <BottomNavBar>
          <AddProductButton
            category={this.state.category}
            addProductToState={this.addProductToState}
          ></AddProductButton>
          <AddFinishedProductsToCart></AddFinishedProductsToCart>

          <WrappedScaner
            addOrModificateItem={adOrModificateProduct(
              this.addProductToState,
              this.modifyProductInState
            )}
          ></WrappedScaner>
        </BottomNavBar>
      </React.Fragment>
    );
  }
}

export function WrappedProductsCard() {
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  return (
    <ProductsCard
      appContext={appContext}
      homeContext={homeContext}
    ></ProductsCard>
  );
}

export default ProductsCard;
