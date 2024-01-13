import React, { useContext, useEffect, useState, useRef } from "react";
import "./ResourceDescription.css";
import { ResourceContext } from "../../contexts/resourceContext";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import ChangeResource from "./ChangeResource";
import { SwipeRightContext } from "../../contexts/SwipeRight";

function ResourceDescription(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editQuantity, setEditQuantity] = useState(false);
  const resourceContext = useContext(ResourceContext);
  const appContext = useContext(AppContext);
  const timeoutRef = useRef(null);
  const clickedRef = useRef(false);
  const doubleClick = useRef(false);
  const followMouseRef = useRef(false);


  const showButtons = () => {
    clickedRef.current = true;
    timeoutRef.current = setTimeout(() => {
      if (doubleClick.current || followMouseRef.current) {
        clickedRef.current = false;
        followMouseRef.current = false;
        return;
      }
      !props.showButtons
        ? props.setShowButtons(true)
        : props.setShowButtons(false);
    }, 350);

  };

  const handleMouseMove = () => { 
    if (clickedRef.current) {
      followMouseRef.current = true;
    }
 
  };

 

  useEffect(() => {
    console.log('use effect')
    if (appContext.appState === APP_STATES.DEFAULT) {
      setEditName(false);
      setEditQuantity(false);
      setIsDisabled(false);
      doubleClick.current = false;
      followMouseRef.current = false;
      clickedRef.current = false;
      clearTimeout(timeoutRef.current);
    }
    if (appContext.appState !== APP_STATES.DEFAULT) {
      setIsDisabled(true);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [appContext, clickedRef, editName]);

  return (
    <React.Fragment>
      {!editName ? (
        <div
          className="product__name"
          onMouseDown={isDisabled ? null : showButtons}
          onTouchStart={
            isDisabled ? null : showButtons}
          
            onDoubleClick={
            isDisabled
              ? null
              : () => {
                  appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
                  doubleClick.current = true;
                  setEditName(true);
                }
          }
          onMouseMove={handleMouseMove}
          onTouchMove={
            handleMouseMove}
          onBlur={()=>{console.log('dupa')}}
        >
          {resourceContext.resource.name}
        </div>
      ) : (
        <div
          style={{
            marginLeft: "2.5%",
            marginRight: "2.5%",
            marginTop: "2.5%",
            marginBottom: "2.5%",
            width: "65%",
          }}
        >
          <ChangeResource
            resourceName={"Name"}
            resourceValue={resourceContext.resource.name}
            resourceType={"text"}
            updateMethod={props.updateMethod}
          ></ChangeResource>
        </div>
      )}

      {!editQuantity ? (
        <div
          className="product__quantity centered-text"
          onMouseDown={isDisabled ? null : showButtons}
          onTouchStart={
            isDisabled ? null : showButtons}
          
            onDoubleClick={
            isDisabled
              ? null
              : () => {
                  appContext.setAppState(APP_STATES.AWAITING_API_RESPONSE);
                  doubleClick.current = true;
                  setEditQuantity(true);
                }
          }
          onMouseMove={handleMouseMove}
          onTouchMove={
            handleMouseMove}
          onBlur={()=>{console.log('dupa')}}
        >
          {resourceContext.resource.quantity}
        </div>
      ) : (
        <div
          style={{
            marginLeft: "2.5%",
            marginRight: "2.5%",
            marginTop: "2.5%",
            marginBottom: "2.5%",
            width: "30%",
          }}
        >
          <ChangeResource
            resourceName={"Quantity"}
            resourceValue={resourceContext.resource.quantity}
            resourceType={"number"}
            updateMethod={props.updateMethod}
          ></ChangeResource>
        </div>
      )}
    </React.Fragment>
  );
}

export default ResourceDescription;
