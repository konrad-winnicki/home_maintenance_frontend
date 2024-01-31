import React, { useContext, useEffect, useState } from "react";
import "./createItemPrompt.css";
import { AppContext } from "../../contexts/appContext";
import { APP_STATES } from "../../applicationStates";
import { BsChevronCompactLeft } from "react-icons/bs";
export const CreateProductPrompt = () => {
  const appContext = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name) {
      appContext.setShowPrompt(null);
      appContext.setAppState(APP_STATES.DEFAULT);
      return;
    }
    appContext.setPromptData(formData);
    appContext.setAppState(APP_STATES.DATA_READY);
  };

  return (
    <div className="create_item">
      <form className="form" onSubmit={handleSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold"
          style={{
            width: "90%",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: "4vw",
            marginLeft: "15px",
            marginTop: "10px"
          }}
          htmlFor="name"
        >
          Introduce product name:
        </label>

        <input
          className=""
          style={{
            width: "90%",
            height: "20%",
            padding: "3%",
            fontWeight: "bold",
            alignContent: "center",
            alignSelf: "center",
            marginTop: "2%",
            marginBottom: "2%",
            marginLeft: "5%",
            marginRight: "5%",
            border: "2px solid #f6bd60",
            
          }}
          type="text"
          id="name"
          name="name"
          autoFocus="true"
          onChange={handleInputChange}
        />

       
        <div className="navbar">
          <div className="col-md-1">
            <button
              className="create_item_buttons"
              type="submit"
              onClick={() => {
                appContext.setShowPrompt(false);
                appContext.setAppState(APP_STATES.DEFAULT);
              }}
            >
              Cancel
            </button>
          </div>
            <button
              className="create_item_buttons"
              type="submit"
              onSubmit={() => {
                handleSubmit();
              }}
            >
              OK
            </button>
        </div>
      </form>
    </div>
  );
};
