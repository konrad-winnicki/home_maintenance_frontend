import React, { useContext, useEffect, useState } from "react";
import "./ResourceDescription.css";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import ChangeResource from "./ChangeResource";

function ResourceDescription(props) {
  const [isDisabled, setIsDisabled] = useState(false);

  const [editName, setEditName] = useState(false);
  const [editQuantity, setEditQuantity] = useState(false);
  const resourceContext = useContext(ResourceContext);

  const appContext = useContext(AppContext);


  useEffect(() => {
    if (appContext.appState === APP_STATES.DEFAULT) {
      setEditName(false);
      setEditQuantity(false);
      setIsDisabled(false);
    }
    if (appContext.appState !== APP_STATES.DEFAULT) {
      setIsDisabled(true);
    }
  }, [appContext]);

  
  return (
    <React.Fragment>
      {!editName ? (
        <div
          className="product__name"
          onClick={
            isDisabled
              ? null
              : () => {
                  appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
                  setEditName(true);
                }
          }
        >
          {resourceContext.resource.name}
        </div>
      ) : (
        <div style={{ marginLeft: "2.5%", marginRight: "2.5%", width: "65%" }}>
          <ChangeResource
            resourceName={"Name"}
            resourceValue={resourceContext.resource.name}
            resourceType={'text'}

            updateMethod={props.updateMethod}
          ></ChangeResource>
        </div>
      )}

      {!editQuantity ? (
        <div
          className="product__quantity centered-text"
          onClick={
            isDisabled
              ? null
              : () => {
                  appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
                  setEditQuantity(true);
                }
          }
        >
          {resourceContext.resource.quantity}
        </div>
      ) : (
        <div style={{ marginLeft: "2.5%", marginRight: "2.5%", width: "30%" }}>
          <ChangeResource
            resourceName={"Quantity"}
            resourceValue={resourceContext.resource.quantity}
            resourceType={'number'}
            updateMethod={props.updateMethod}
          ></ChangeResource>
        </div>
      )}
    </React.Fragment>
  );
}

export default ResourceDescription;
