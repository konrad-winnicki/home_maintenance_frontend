import React, { useContext, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { updateProduct } from "../../services/store";
import { APP_STATES } from "../../applicationStates";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import {
  errorHandler,
  notificator,
  serverResponseResolver,
} from "../../services/auxilaryFunctions";
import "../ResourceButtons.css";
import { HomeContext } from "../../contexts/homeContext";
import { logOut } from "../../services/loginAuxilaryFunctions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../ResourceButtons.css";

const ChangeCategory = () => {
  const session_code = localStorage.getItem("session_code");
  const productContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const homeContext = useContext(HomeContext);

  const homeId = homeContext.home.id;
  const currentCategory = productContext.resource.category;

  const onClickHandler = (choosenCategory) => {
    const product_data = {
      id: productContext.resource.product_id,
      updatedValues: {
        quantity: productContext.resource.quantity,
        name: productContext.resource.name,
        category: choosenCategory,
      },
    };
    appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);

    const notificatorMessages = {
      unknown: "Unknown error",
      success: `Category changed to ${choosenCategory}`,
    };

    const deleteFromCurrentCategoryAddToTargerCategory = ()=>{
      productContext.deleteResourceFromState(
        product_data.id,
        currentCategory)
        const productWithChangedCategory = {product_id: productContext.resource.product_id, quantity: productContext.resource.quantity,
          name: productContext.resource.name,
          category: choosenCategory}
      productContext.addResourceToState(productWithChangedCategory, choosenCategory)
    }

    updateProduct(product_data, homeId, session_code)
      .then((response) => {
        return serverResponseResolver(response).then((result) => {
          const actions = {
            200: () => {
              deleteFromCurrentCategoryAddToTargerCategory()
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

    appContext.setAppState(APP_STATES.DEFAULT);
  };

  function excludeCurrentCategory() {
    const categoriesToChoose = ["fridge", "larder", "bathroom", "other"];
    return categoriesToChoose.filter((category) => {
      return currentCategory !== category;
    });
  }

  return (
    <div style={{ zIndex: 100 }}>
      <div style={{ alignItems: "center", zIndex:5}}>
        <DropdownButton
          style={{ alignItems: "center" }}
          disabled={appContext.appState !== APP_STATES.DEFAULT ? true : false}
          id="resource_button"
          title={<BiCategory />}
        >
          <div className="col text-left" style={{ marginLeft: "10px" }}>
            Change category to:
          </div>
          {excludeCurrentCategory().map((category) => {
            return (
              <div key={category}>
                <Dropdown.Divider  />
                <Dropdown.Item
                
               
                  onClick={() => {
                    onClickHandler(category);
                  }}
                >
                  {category}
                </Dropdown.Item>
              </div>
            );
          })}
        </DropdownButton>
      </div>
    </div>
  );
};

export default ChangeCategory;
